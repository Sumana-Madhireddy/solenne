import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";

const Orders = () => {
    const { refreshAccessToken } = useContext(CartContext);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        let currentToken = localStorage.getItem('authToken');
        try {
            const response = await fetch('http://localhost:5000/all-orders',{
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                    'Content-Type': 'application/json',
                },
            }); 
            if (response.status === 401) {
                currentToken = await refreshAccessToken();
                response = await fetch('http://localhost:5000/all-orders',{
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                        'Content-Type': 'application/json',
                    },
                }); 
            }
            console.log("response ", response);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    
    const handleViewOrder = (orderId) => {
        navigate(`/admin/orders/${orderId}`);
    };
    console.log("order ",orders);


    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Orders</h2>
                </div>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border border-gray-200">Order</th>
                            <th className="p-2 border border-gray-200">Status</th>
                            <th className="p-2 border border-gray-200">TotalAmount</th>
                            <th className="p-2 border border-gray-200">View Order</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center">
                            <td className="p-2 border border-gray-200">{order.orderId}</td>
                            <td className="p-2 border border-gray-200">{order.status}</td>
                            <td className="p-2 border border-gray-200">${order.totalAmount}</td>
                            <td className="p-2 border border-gray-200">
                                <button
                                onClick={() => handleViewOrder(order.orderId)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                                >
                                view order
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;