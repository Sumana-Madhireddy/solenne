import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowDropDown  from '@mui/icons-material/ArrowDropDown';

export const AccountDropDown = ({ onSignOut, firstName }) => {
    const navigate  = useNavigate();
    const handleSignOut = () => {
        onSignOut(); 
        navigate('/signin'); 
    };
    const handleAccountClick = () => {
        navigate('/account');

    }
    const handleOrders= () => {
        navigate('/orders');
    }

    return (
        <div className="relative group inline-block">
            <button className="text-gray-950 hover:text-black"> Hello, {firstName} <ArrowDropDown/></button>
            <div className="absolute hidden group-hover:flex flex-col bg-white border border-gray-200 rounded shadow-lg  z-10 w-32">
                <button
                    onClick={handleAccountClick}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                    Account
                </button>
                <button
                    onClick={handleOrders}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                    Orders
                </button>
                <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

