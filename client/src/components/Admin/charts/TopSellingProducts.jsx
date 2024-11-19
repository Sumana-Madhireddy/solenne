import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend);

const TopSellingProductsChart = () => {
    const { refreshAccessToken } = useContext(CartContext);
    const [chartData, setChartData] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            let currentToken = localStorage.getItem('authToken');
            let response;
            try {
                response = await fetch('http://localhost:5000/admin/order-items', {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 401) {
                    currentToken = await refreshAccessToken();
                    response = await fetch('http://localhost:5000/admin/order-items', {
                        headers: {
                            'Authorization': `Bearer ${currentToken}`,
                            'Content-Type': 'application/json',
                        },
                    });
                }

                const orderItems = await response.json();
                console.log("orderItems - ",orderItems);
                const productNames = orderItems.map(item => item.productName);
                const totalQuantities = orderItems.map(item=> parseInt(item.totalQuantity));
                const totalRevenue = orderItems.map(item=> parseInt(item.totalRevenue));
                setChartData({
                    labels: productNames,
                    datasets: [
                        {
                            label: 'Total Quantity Sold',
                            data: totalQuantities,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        },
                        {
                            label: 'Total Revenue',
                            data: totalRevenue,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ]
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [refreshAccessToken]);

    return (
        <div style={{ width: '80%', margin: '20px auto' }}>
            <h3 className="text-2xl font-semibold text-center mb-4">Top Selling Products</h3>
            {chartData && chartData.labels ? (
                <Bar
                    data={chartData}
                    options={{
                        indexAxis: 'y', 
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        return `Sales: $${tooltipItem.raw.toFixed(2)}`;
                                    },
                                },
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

export default TopSellingProductsChart;
