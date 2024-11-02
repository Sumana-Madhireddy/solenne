import React from "react";
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    const handleShop = () => {
        navigate('/'); 
    };
    return (
        <div className="container text-center text-pretty mx-auto p-6">
            <div className="font-heading py-2 text-2xl">Checkout Successful!</div>
            <div className="font-heading py-2 text-2xl">Time to start shopping!</div>
            <button onClick={handleShop} className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-black">
                Shop
            </button>
        </div>
    );
};

export default CheckoutSuccess;