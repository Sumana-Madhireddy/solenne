// import React, { createContext, useReducer, useContext, useEffect } from "react";

// // const initialCartState = [];
// const initialCartState = JSON.parse(localStorage.getItem('cart')) || [];

// const cartReducer = (state, action) => {
//     switch(action.type) {
//         case 'ADD_TO_CART':
//             const newQuantity = Number(action.payload.quantity);
//             const existingItem = state.find(
//                 item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
//             );
//             if (existingItem) {
//                 return state.map(item => 
//                     item.id === action.payload.id && item.selectedSize === action.payload.selectedSize ?
//                     {...item,quantity:item.quantity+newQuantity}: item
//                 );
//             }
//             return [...state,{...action.payload,quantity: newQuantity}];
//         case 'REMOVE_FROM_CART':
//             return state.filter(item=> item.id !== action.payload.id || item.selectedSize !== action.payload.selectedSize);
//         default:
//             return state;
//     }
// }

// const CartContext = createContext();


// export const CartProvider = ({children}) => {
//     const [cart,dispatch] = useReducer(cartReducer,initialCartState);
//     const cartCount = cart.reduce((total,item) => total+item.quantity,0);
//     useEffect(() => {
//         localStorage.setItem('cart',JSON.stringify(cart));
//     },[cart]);
//     return (
//         <CartContext.Provider value = {{cart,cartCount,dispatch}}>
//             {children}
//         </CartContext.Provider>
//     );
// }

// export const useCart = () => useContext(CartContext);



import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart,setCart] = useState({items: []});
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('authToken');
    console.log('TOken ', token);

    useEffect(()=>{
        if (token) {
            getCartItems();
        }
    },[token]);

    const getCartItems = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/cart',{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCart(data);
            } else {
                console.error('Failed to fetch cart items');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    };

    const addItemToCart = async (productId, quantity, size) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/cart/add',{
                method: 'POST',
                headers:  {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productId,quantity,size}),
            });
            console.log('addItemToCart response - ',response);
            if(response.ok) {
                await getCartItems();
            } else {
                console.error('Failed to add item to cart');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeItemFromCart = async (cartItemId) => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/cart/remove/${cartItemId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            setCart((prevCart) => ({
              ...prevCart,
              items: prevCart.items.filter((item) => item.cartItemId !== cartItemId),
            }));
          } else {
            console.error('Failed to remove item from cart');
          }
        } catch (error) {
          console.error('Error removing item from cart:', error);
        } finally {
          setLoading(false);
        }
    };

    const increaseQuantity = async (cartItemId, currentQuantity) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/cart/update/${cartItemId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: currentQuantity + 1 }),
            });
            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
            } else {
                console.error('Failed to increase quantity');
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
        } finally {
            setLoading(false);
        }
    };

    const decreaseQuantity = async (cartItemId, currentQuantity) => {
        if (currentQuantity <= 1) {
            await removeItemFromCart(cartItemId);  
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/cart/update/${cartItemId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: currentQuantity - 1 }),
            });
            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
            } else {
                console.error('Failed to decrease quantity');
            }
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        } finally {
            setLoading(false);
        }
    };
    
      // Function to clear all items from the cart
    const clearCart = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:5000/cart/clear', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            setCart({ items: [] });
          } else {
            console.error('Failed to clear cart');
          }
        } catch (error) {
          console.error('Error clearing cart:', error);
        } finally {
          setLoading(false);
        }
    };
    
    return (
        <CartContext.Provider
            value={{
            cart,
            loading,
            addItemToCart,
            removeItemFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            getCartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};