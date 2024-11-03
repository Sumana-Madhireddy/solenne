import React, {useContext } from "react";
import { useNavigate } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';
import { CartContext } from "../Context/CartContext";

const Cart = () => {
    const navigate = useNavigate();
    const {cart, increaseQuantity, decreaseQuantity, removeItemFromCart, clearCart} = useContext(CartContext);
    
    console.log("Cart cart- ",cart);

    const handleShop = () => {
        navigate('/'); 
    };

    if (!cart.items || cart.items.length === 0) {
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
        increaseQuantity(item.cartItemId, item.quantity)
    };

    const handleDecreaseQuantity = (item) => {
        decreaseQuantity(item.cartItemId, item.quantity);
    };

    const handleRemoveFromCart = (item) => {
        removeItemFromCart(item.cartItemId);
    };

    const handleClearCart = () =>{
        clearCart();
    }

    const calculateTotal = () => {
        return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    };


    return (
        <div className="container mx-auto p-6">
            <div className="text-3xl font-heading font-semibold mb-4">Shopping Cart</div>
            <ul className="space-y-4">
                {cart.items.map((item,index)=>(
                    <li key={index} className="flex items-center justify-between border p-4">
                        <div className="flex items-center space-x-4">
                            <img 
                            src={item.product.img}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover"></img>
                            <div>
                                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                                <p>Size: {item.size}</p>
                                <div>
                                    <button className="text-black px-2 py-1 rounded" onClick={()=>handleDecreaseQuantity(item)}>-</button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button className="text-black px-2 py-1 rounded" onClick={()=>handleIncreaseQuantity(item)}>+</button>
                                </div>
                                <p>Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item)} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mt-4">
                <div>
                    <button onClick={handleClearCart} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black">
                        Clear Cart
                    </button>
                </div>
                <div className="">
                    <h2 className="text-2xl font-semibold">Total: ${calculateTotal()}</h2>
                    <CheckoutButton/>
                </div>
            </div>
        </div>
    );
};

export default Cart;