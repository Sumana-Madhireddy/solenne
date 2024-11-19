import React from "react";
import { AccountDropDown } from "../Header/AccountDropDown";
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ onSignOut }) => {
    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstName');
    const handleSignOut = () => {
        onSignOut(); 
        navigate('/signin'); 
    };
    return (
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center m-5 md:m-10 h-14 bg-white text-black">
            <div className="font-brand text-2xl font-bold">
                <a href="/">SOLENNE</a>
            </div>
            <div className="hidden md:flex space-x-4">
                <ul className="flex space-x-4">
                    <li><a href="/admin/dashboard" className="hover:text-gray-500 font-heading">Dashboard</a></li>
                    <li><a href="/admin/product-list" className="hover:text-gray-500 font-heading">Products</a></li>
                    <li><a href="/admin/all-orders" className="hover:text-gray-500 font-heading">Orders</a></li>
                    <li><a href="/admin/users" className="hover:text-gray-500 font-heading">Users</a></li>
                </ul>
            </div>
            <div className="flex items-center space-x-4">
                <a className="hover:text-gray-500 font-heading"><AccountDropDown onSignOut={handleSignOut} firstName = {firstName}/></a>
            </div>
        </div>
    );
};

export default AdminHeader;