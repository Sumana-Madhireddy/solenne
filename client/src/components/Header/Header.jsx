import React from "react";
import CartButton from './CartButton/CartButton';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../Context/CartContext";

const Header = ({ onSignOut }) => {
    const navigate = useNavigate();
    const { cartCount } = useCart(); 
    const handleSignOut = () => {
        onSignOut(); 
        navigate('/signin'); 
    };
    const handleCartClick = () => {
        navigate('/cart'); 
    };

    return (
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center m-5 md:m-10 h-14 bg-white text-black">
            <div className="font-brand text-2xl font-bold">
                <a href="/">SOLENNE</a>
            </div>
            <div className="hidden md:flex space-x-4">
                <ul className="flex space-x-4">
                    <li><a href="/Shop" className="hover:text-gray-500 font-heading">Shop</a></li>
                    <li><a href="/Sale" className="hover:text-gray-500 font-heading">Sale</a></li>
                    <li><a href="/About" className="hover:text-gray-500 font-heading">About</a></li>
                    <li><a href="/Contact" className="hover:text-gray-500 font-heading">Contact</a></li>
                </ul>
            </div>
            <div className="flex items-center space-x-4">
                <a onClick={handleSignOut} className="hover:text-gray-500 font-heading">Signout</a>
                <a onClick={handleCartClick} className="hover:text-gray-500 font-heading"><CartButton cartCount={cartCount} /></a>
            </div>
        </div>
    );
};

export default Header;
