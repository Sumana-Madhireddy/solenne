// import React, { useContext } from "react";
// import CartButton from './CartButton';
// import { useNavigate } from 'react-router-dom';
// import { CartContext } from "../Context/CartContext";
// import { AccountDropDown } from "./AccountDropDown";

// const Header = ({ onSignOut }) => {
//     const navigate = useNavigate();
//     const {cart} = useContext(CartContext);
//     const firstName = localStorage.getItem('firstName');
//     const handleSignOut = () => {
//         onSignOut(); 
//         navigate('/signin'); 
//     };
//     const handleCartClick = () => {
//         navigate('/cart'); 
//     };
//     const cartCount = cart.items ? cart.items.reduce((count, item) => count + item.quantity, 0) : 0;

//     return (
//         <div className="flex flex-wrap md:flex-nowrap justify-between items-center m-5 md:m-10 h-14 bg-white text-black">
//             <div className="font-brand text-2xl font-bold">
//                 <a href="/">SOLENNE</a>
//             </div>
//             <div className="hidden md:flex space-x-4">
//                 <ul className="flex space-x-4">
//                     <li><a href="/Shop" className="hover:text-gray-500 font-heading">Shop</a></li>
//                     <li><a href="/Sale" className="hover:text-gray-500 font-heading">Sale</a></li>
//                     <li><a href="/About" className="hover:text-gray-500 font-heading">About</a></li>
//                     <li><a href="/Contact" className="hover:text-gray-500 font-heading">Contact</a></li>
//                 </ul>
//             </div>
//             <div className="flex items-center space-x-4">
//                 <a className="hover:text-gray-500 font-heading"><AccountDropDown onSignOut={handleSignOut} firstName = {firstName}/></a>
//                 <a onClick={handleCartClick} className="hover:text-gray-500 font-heading"><CartButton cartCount={cartCount} /></a>
//             </div>
//         </div>
//     );
// };

// export default Header;


import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../Context/CartContext";
import { AccountDropDown } from "./AccountDropDown";
import { FaShoppingCart } from 'react-icons/fa';

const Header = ({ onSignOut }) => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const firstName = localStorage.getItem('firstName');
    
    const handleSignOut = () => {
        onSignOut();
        navigate('/signin');
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const cartCount = cart.items ? cart.items.reduce((count, item) => count + item.quantity, 0) : 0;

    return (
        <div className="bg-white shadow-md mb-10 sticky top-0 z-50">
            <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between shadow-md">

                
                <div className="font-brand text-2xl px-5 pr-10 font-bold text-gray-900">
                    <a href="/">SOLENNE</a>
                </div>

                <div className="hidden font-heading md:flex space-x-6 items-center">
                    <a href="/Shop" className="text-gray-700 hover:text-teal-500 transition duration-300">Shop</a>
                    {/* <a href="/Sale" className="text-gray-700 hover:text-teal-500 transition duration-300">Sale</a> */}
                    <a href="/About" className="text-gray-700 hover:text-teal-500 transition duration-300">About</a>
                    <a href="/Contact" className="text-gray-700 hover:text-teal-500 transition duration-300">Contact</a>
                </div>

                <div className="flex font-heading items-center space-x-6">
                    <AccountDropDown 
                        onSignOut={handleSignOut} 
                        firstName={firstName} 
                    />
                    <div className="relative cursor-pointer" onClick={handleCartClick}>
                        <FaShoppingCart className="text-2xl text-gray-700 hover:text-teal-500 transition duration-300"/>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-teal-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
