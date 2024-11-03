import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('authToken'); 

    const handleNavigateToProduct = (productId) => {
        console.log('productId - ',productId);
        navigate(`/product-detail/${productId}`);
    }; 

    const handleNavigateToOrderSummary = (orderId) => {
        console.log('orderId - ',orderId);
        navigate(`/order-summary/${orderId}`);
    };

    

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
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-heading font-semibold mb-4">Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-list space-y-8">
                    {orders.map((order) => (
                        <div className="container mx-auto border-b border-gray-200 pb-4 p-6">
                            <p className="text-xl mb-2">Order ID: # {order.orderId}</p>
                            <ul className="mt-4">
                                {order.items.map((item, index) => (
                                    <li key={index} className="flex items-center justify-between ">
                                        <div className="flex items-center space-x-4">
                                        <img src={item.product.img} alt={item.product.name} className="w-24 h-24 object-cover" />
                                        <div>
                                            <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                            <p className="text-gray-600">Size: {item.size}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p>Quantity: {item.quantity}</p>
                                        <p className="text-lg font-semibold">${item.price}</p>
                                    </div>
                                    </li>
                                ))}
                                <div className='flex justify-between'>
                                    <p className="text-xl mb-2">Status: {order.status}</p>
                                    <p onClick={() =>handleNavigateToOrderSummary(order.orderId)} className="text-xl underline hover:cursor-pointer">Order Summary</p>
                                    <p className="text-xl mb-2">Total: ${order.totalAmount}</p>
                                </div>
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={() => navigate('/')} className="bg-gray-800 text-white px-4 py-2 rounded mt-4">Continue Shopping</button>
        </div>
    );
};

export default Orders;


