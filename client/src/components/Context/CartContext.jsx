import React, { createContext, useEffect, useState } from "react";
import { API_ENDPOINT } from "../../constants";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart,setCart] = useState({items: []});
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('authToken');
    console.log('token ',token);
    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(()=>{
        if (token) {
            getCartItems();
        }
    },[token]);
    console.log('Context cart ',cart);

    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.accessToken); 
                return data.accessToken;
            } else {
                console.error('Refresh token expired. Please log in again.');
            }
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }
    };

    const getCartItems = async () => {
        setLoading(true);
        let currentToken = localStorage.getItem('authToken');
        try {
            let response = await fetch(`${API_ENDPOINT}/cart`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                currentToken = await refreshAccessToken();  
                if (currentToken) {
                    response = await fetch(`${API_ENDPOINT}/cart`, {
                        headers: {
                            'Authorization': `Bearer ${currentToken}`,
                            'Content-Type': 'application/json',
                        },
                    });
                } else {
                    console.error('Session expired. Please log in again.');
                    return;
                }
            }

            if (response.ok) {
                const data = await response.json();
                console.log('data - ',data);
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
            const existingItem = cart.items.find(
                (item) => item.productId === productId && item.size === size
            );
            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                const response = await fetch(`${API_ENDPOINT}/cart/update/${existingItem.cartItemId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: newQuantity }),
                });
                if (response.ok) {
                    const updatedCart = await response.json();
                    setCart(updatedCart);
                } else {
                    console.error('Failed to update item quantity in cart');
                }
            } else {
                const response = await fetch(`${API_ENDPOINT}/cart/add`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId, quantity, size }),
                });
    
                if (response.ok) {
                    await getCartItems(); 
                } else {
                    console.error('Failed to add item to cart');
                }
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
          const response = await fetch(`${API_ENDPOINT}/cart/remove/${cartItemId}`, {
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
            const response = await fetch(`${API_ENDPOINT}/cart/update/${cartItemId}`, {
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
            const response = await fetch(`${API_ENDPOINT}/cart/update/${cartItemId}`, {
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
          const response = await fetch(`${API_ENDPOINT}/cart/clear`, {
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