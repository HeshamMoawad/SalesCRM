import React from 'react';
import MainLayout from '../../Layout/MainLayout';


const Subscriptions = () => {
    return (
        <MainLayout initToggle={{
            Dashboard: false,
            Customers: false,
            Subscriptions:true,
        }}>
            <h1>subscriptions</h1>
        </MainLayout>
    );
}

export default Subscriptions;
