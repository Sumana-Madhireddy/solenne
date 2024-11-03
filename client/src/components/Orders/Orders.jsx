import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('authToken');  

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    return (
        <div>
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div className="container mx-auto p-6">
                            <p>Order ID: {order.orderId}</p>
                            <p>Status: {order.status}</p>
                            <p>Total: ${order.totalAmount}</p>
                            <ul className="mt-4">
                                {order.items.map((item, index) => (
                                    <li key={index} className="flex items-center space-x-4">
                                        <img src={item.product.img} alt={item.product.name} className="w-24 h-24" />
                                        <div>
                                            <h2>{item.product.name}</h2>
                                            <p>Size: {item.size}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ${item.price}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => navigate('/')} className="bg-gray-800 text-white px-4 py-2 rounded mt-4">Continue Shopping</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;


