import React, {useContext} from "react";
import { CartContext } from "../Context/CartContext";

const CheckoutButton = () => {
    const {cart, clearCart, getCartItems } = useContext(CartContext);

    const handleCheckout = async () => {
        try {
            const response  = await fetch('http://localhost:5000/create-checkout-session',{
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({cartItems: cart.items}),
            });
            const data = await response.json();
            if (data.url){
                window.location.href = data.url;
                clearCart();
                getCartItems();

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