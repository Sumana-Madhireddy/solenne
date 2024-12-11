import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { API_ENDPOINT } from '../../../constants';

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

const RevenueByCategoryChart = () => {
    const { refreshAccessToken } = useContext(CartContext);
    const [chartData, setChartData] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            let currentToken = localStorage.getItem('authToken');
            let response;
            try {
                response = await fetch(`${API_ENDPOINT}/admin/order-items`, {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 401) {
                    currentToken = await refreshAccessToken();
                    response = await fetch(`${API_ENDPOINT}/admin/order-items`, {
                        headers: {
                            'Authorization': `Bearer ${currentToken}`,
                            'Content-Type': 'application/json',
                        },
                    });
                }

                const orderItems = await response.json();
                console.log("revenueByCategory orderItems ",orderItems);

                const revenueByCategory = orderItems.reduce((acc, item) => {
                    const category = item.productCategory;
                    const revenue = parseFloat(item.totalRevenue); 
                
                    if (acc[category]) {
                        acc[category] += revenue;
                    } else {
                        acc[category] = revenue;
                    }
                
                    return acc;
                }, {});
                
                console.log('revenueByCategory ',revenueByCategory);

                const categories = Object.keys(revenueByCategory);
                const revenues = Object.values(revenueByCategory);

                const data = {
                    labels: categories,
                    datasets: [
                        {
                            label: 'Total Revenue by Category',
                            data: revenues,
                            backgroundColor: '#36A2EB', 
                        },
                    ],
                };
                setChartData(data);
            } catch (error) {
                console.error('Error fetching order items data:', error);
            }
        };

        fetchData();
    }, [refreshAccessToken]);

    return (
        <div style={{ width: '80%', margin: '20px auto' }}>
            <h3 className="text-2xl font-semibold text-center mb-4">Revenue by Product Category</h3>
            {chartData && chartData.labels ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                // text: 'Revenue Breakdown by Product Category',
                            },
                            legend: {
                                position: 'top',
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Product Category',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Total Revenue ($)',
                                },
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default RevenueByCategoryChart;
