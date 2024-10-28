import React from "react";
import { useCart } from "../Context/CartContext";

const CheckoutButton = () => {
    const cart = useCart();
    const handleCheckout = async () => {
        try {
            const response  = await fetch('http://localhost:5000/create-checkout-session',{
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({cartItems: cart}),
            });
            const data = await response.json();
            console.log('data - ',data);
            if (data.url){
                window.location.href = data.url;
            } else {
                console.error('Failed to get a valid checkout URL');
            }
            
        } catch (error) {
            console.error('Error during Checkout:', error);
        }
    };

    return (
        <>
            <button onClick={handleCheckout} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black">
                Checkout
            </button>
        </>
    );
};

export default CheckoutButton;