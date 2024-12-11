import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { API_ENDPOINT } from '../../../constants';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const TotalSalesOverview = () => {
    const { refreshAccessToken } = useContext(CartContext);
    const [salesData, setSalesData] = useState({});
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

                // Group sales by month
                const salesByDate = orders.reduce((acc, order) => {
                    const date = new Date(order.createdAt);
                    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Grouping by month
                    acc[monthYear] = (acc[monthYear] || 0) + parseFloat(order.totalAmount);
                    return acc;
                }, {});

                // Sort the sales data by month in ascending order (oldest first)
                const sortedLabels = Object.keys(salesByDate).sort((a, b) => {
                    const [monthA, yearA] = a.split('-').map(Number);
                    const [monthB, yearB] = b.split('-').map(Number);
                    return yearA - yearB || monthA - monthB; // Sort by year, then month in ascending order
                });

                const sortedData = sortedLabels.map((label) => salesByDate[label]);

                // Prepare the chart data
                setSalesData({
                    labels: sortedLabels,
                    datasets: [
                        {
                            label: 'Total Sales ($)',
                            data: sortedData,
                            borderColor: '#4BC0C0',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };
        fetchData();
    }, [refreshAccessToken]);

    return (
        <div style={{ width: '80%', margin: '20px auto' }}>
            <h3 className="text-2xl font-semibold text-center mb-4">Total Sales Overview</h3>
            {salesData && salesData.labels ? (
                <Line
                    data={salesData}
                    options={{
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                // text: 'Total Sales Over Time',
                            },
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`,
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Time (Month-Year)',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Total Sales ($)',
                                },
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            ) : (
                <p>Loading sales data...</p>
            )}
        </div>
    );
};

export default TotalSalesOverview;
