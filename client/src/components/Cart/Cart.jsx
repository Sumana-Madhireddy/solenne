import React from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';

const Cart = () => {
    const navigate = useNavigate();
    const {cart, dispatch} = useCart();
    
    console.log("Cart - ",cart);

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
    };

    const handleIncreaseQuantity = (item) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {...item,quantity: 1},
        });
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1){
            dispatch({
                type: 'ADD_TO_CART',
                payload: {...item, quantity: -1},
            });
        }
    };

    const handleRemoveFromCart = (item) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: item,
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total,item)=> total+item.price*item.quantity,0).toFixed(2);
    };

    const handleCheckout = () => {
        alert('Proceeding to checkout');
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
                                {/* <p>Quantity: {item.quantity}</p> */}
                                <div>
                                    <button className="text-black px-2 py-1 rounded" onClick={()=>handleDecreaseQuantity(item)}>-</button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button className="text-black px-2 py-1 rounded" onClick={()=>handleIncreaseQuantity(item)}>+</button>
                                </div>
                                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item)} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Total: ${calculateTotal()}</h2>
                {/* <button onClick={handleCheckout} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black">
                    Checkout
                </button> */}
                <CheckoutButton/>
            </div>
        </div>
    );
};

export default Cart;