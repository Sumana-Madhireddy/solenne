import React, {useContext} from "react";
import { CartContext } from "../Context/CartContext";

const CheckoutButton = ({totalAmount}) => {
    const {cart, clearCart, getCartItems } = useContext(CartContext);
    const token = localStorage.getItem('authToken');

    const handleCheckout = async () => {
        try {
            const response  = await fetch('http://localhost:5000/create-checkout-session',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({cartItems: cart.items, totalAmount}),
            });
            const data = await response.json();
            console.log("handleCheckout data - ", data);
            if (data.url){
                window.location.href = data.url;
                // clearCart();
                // getCartItems();

            } else {
                console.error('Failed to get a valid checkout URL');
            }
        } catch (error) {
            console.error('Error during Checkout:', error);
        }
    };

    return (
        <>
            <button onClick={handleCheckout} className=" bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded font-semibold">
                Checkout
            </button>
        </>
    );
};

export default CheckoutButton;