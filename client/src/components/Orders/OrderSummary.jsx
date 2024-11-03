import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
                });
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                navigate('/'); // Redirect if error
            }
        };
        fetchOrderDetails();
    }, [orderId, navigate]);

    if (!order) return <div>Loading order details...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-4">Order Summary</h1>
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
    );
};

export default OrderSummary;