import React, { createContext, useReducer, useContext, useEffect } from "react";

// const initialCartState = [];
const initialCartState = JSON.parse(localStorage.getItem('cart')) || [];

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            const newQuantity = Number(action.payload.quantity);
            const existingItem = state.find(
                item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
            );
            if (existingItem) {
                return state.map(item => 
                    item.id === action.payload.id && item.selectedSize === action.payload.selectedSize ?
                    {...item,quantity:item.quantity+newQuantity}: item
                );
            }
            return [...state,{...action.payload,quantity: newQuantity}];
        case 'REMOVE_FROM_CART':
            return state.filter(item=> item.id !== action.payload.id || item.selectedSize !== action.payload.selectedSize);
        default:
            return state;
    }
}

const CartContext = createContext();


export const CartProvider = ({children}) => {
    const [cart,dispatch] = useReducer(cartReducer,initialCartState);
    const cartCount = cart.reduce((total,item) => total+item.quantity,0);
    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart]);
    return (
        <CartContext.Provider value = {{cart,cartCount,dispatch}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);