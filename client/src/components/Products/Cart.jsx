import React from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from 'react-router-dom';
import ProductDetail from "./Product/ProductDetail";

const Cart = () => {
    const navigate = useNavigate();
    const {cart, dispatch} = useCart();
    const handleShop = () => {
        navigate('/'); 
    };

    if (cart.length === 0) {
        return (
            <div className="container text-center text-pretty mx-auto p-6">
                <div className="font-heading py-2 text-2xl">Your cart is empty.</div>
                <div className="font-heading py-2 text-2xl">Time to start shopping!</div>
                <button onClick={handleShop} className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-black">
                    Shop
                </button>
            </div>
        );
    }

    const handleRemoveFromCart = (item) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: item,
        });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="text-3xl font-heading font-semibold mb-4">Shopping Cart</div>
            <ul className="space-y-4">
                {cart.map((item,index)=>(
                    <li key={index} className="flex items-center justify-between border p-4">
                        <div className="flex items-center space-x-4">
                            <img 
                            src={item.img}
                            alt={item.name}
                            className="w-24 h-24 object-cover"></img>
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p>Size: {item.selectedSize}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item)} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;