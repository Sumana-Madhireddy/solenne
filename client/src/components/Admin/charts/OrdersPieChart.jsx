import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { API_ENDPOINT } from '../../../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrdersDonutChart = () => {
    const { refreshAccessToken } = useContext(CartContext);
    const [chartData, setChartData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let currentToken = localStorage.getItem('authToken');
            let response;
            try {
                response = await fetch(`${API_ENDPOINT}/all-orders`, {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 401) {
                    currentToken = await refreshAccessToken();
                    response = await fetch(`${API_ENDPOINT}/all-orders`, {
                        headers: {
                            'Authorization': `Bearer ${currentToken}`,
                            'Content-Type': 'application/json',
                        },
                    });
                }

                const orders = await response.json();

                // Group orders by status
                const ordersByStatus = orders.reduce((acc, order) => {
                    acc[order.status] = (acc[order.status] || 0) + 1;
                    return acc;
                }, {});

                // Prepare data for the donut chart
                if (ordersByStatus && Object.keys(ordersByStatus).length > 0) {
                    const data = {
                        labels: Object.keys(ordersByStatus),
                        datasets: [
                            {
                                data: Object.values(ordersByStatus),
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                            },
                        ],
                    };
                    setChartData(data);
                } else {
                    console.warn('No data available for chart');
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-1/2 mx-auto my-8">
            <h3 className="text-2xl font-semibold text-center mb-4">Orders by Status</h3>
            {chartData && chartData.labels ? (
                <Pie
                    data={chartData}
                    options={{
                        plugins: {
                            legend: { position: 'top' },
                        },
                        cutout: '50%', // Donut chart effect
                    }}
                />
            ) : (
                <p className="text-center text-gray-500">Loading chart data...</p>
            )}
        </div>
    );
};

export default OrdersDonutChart;
