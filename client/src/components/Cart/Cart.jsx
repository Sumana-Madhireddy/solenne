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
                <button onClick={handleShop} className=" bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full">
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
    const handleNavigate = (productId) => {
        console.log('productId - ',productId);
        navigate(`/product-detail/${productId}`);
    };


    return (
        <div className="container mx-auto p-6">
            <div className="text-3xl  text-teal-600 font-heading font-semibold mb-4">Shopping Cart</div>
            <ul className="space-y-4">
                {cart.items.map((item,index)=>(
                    <li key={index} className="flex items-center justify-between border p-4">
                        <div className="flex items-center space-x-4">
                            <img 
                            onClick={() => handleNavigate(item.productId)}
                            src={item.product.img}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover hover:cursor-pointer"></img>
                            <div>
                                <h2 onClick={() =>handleNavigate(item.productId)} className="text-xl font-semibold hover:cursor-pointer">{item.product.name}</h2>
                                <p>Size: {item.size}</p>
                                <div>
                                    <button className="text-black px-2 py-1 rounded" onClick={()=>handleDecreaseQuantity(item)}>-</button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button className="text-black px-2 py-1 rounded" onClick={()=>handleIncreaseQuantity(item)}>+</button>
                                </div>
                                <p>Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item)} className=" bg-teal-500 hover:bg-teal-600 font-semibold text-white px-4 py-2 rounded">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mt-4">
                <div>
                    <button onClick={handleClearCart} className=" bg-teal-500 hover:bg-teal-600 font-semibold text-white px-4 py-2 rounded">
                        Clear Cart
                    </button>
                </div>
                <div className="">
                    <h2 className="text-2xl font-semibold">Total: ${calculateTotal()}</h2>
                    <CheckoutButton totalAmount = {calculateTotal()}/>
                </div>
            </div>
        </div>
    );
};

export default Cart;