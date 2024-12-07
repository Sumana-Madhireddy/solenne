import React from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import OrdersPieChart from "./charts/OrdersPieChart";
import TotalSalesOverview from "./charts/TotalSalesOverview";
import TopSellingProductsChart from "./charts/TopSellingProducts";
import RevenuebyProductCategory from "./charts/RevenuebyProductCategory";

ChartJS.register(ArcElement, CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 m-10 pt-5">
            <TotalSalesOverview />
            <OrdersPieChart />
            <TopSellingProductsChart />
            <RevenuebyProductCategory/>
        </div>
    );
};

export default Dashboard;
