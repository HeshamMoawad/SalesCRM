import React from 'react';
import "./DashBoard.css";
import DashboardCards from '../../components/DashboardCards/DashboardCards';
import MainLayout from '../../Layout/MainLayout';

const DashBoard = () => {
    return (
        <MainLayout initToggle={{
            Dashboard: true,
            Customers: false,
            Subscriptions:false,
        }}>
            <div className='dashborad'>
                <DashboardCards/>
            </div>
        </MainLayout>
    );
}

export default DashBoard;
