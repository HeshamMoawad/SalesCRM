import React from 'react';
import MainLayout from '../../Layout/MainLayout';
import "./Customers.css";
import Pageination from '../../components/Pageination/Pageination';
import SearchBar from '../../components/SearchBar/SearchBar';
import CustomerCard from '../../components/CustomerCard/CustomerCard';
import { usePermission } from '../../Hooks';



const Customers = () => {   
    const {permission} = usePermission();

    return (
        <MainLayout initToggle={{
            Dashboard: false,
            Customers: true,
            Subscriptions:false,
        }}>
            <div className="customers">
                <SearchBar addPath="customers/add"/>
                <div className="customers-card-container">
                    <CustomerCard role={permission.role} key={Math.random()}/>
                    <CustomerCard role={permission.role} key={Math.random()}/>
                    <CustomerCard role={permission.role} key={Math.random()}/>
                    <CustomerCard role={permission.role} key={Math.random()}/>
                    <CustomerCard role={permission.role} key={Math.random()}/>
                    {/* <CustomerCard key={Math.random()}/>
                    <CustomerCard key={Math.random()}/> */}
                </div>
                <Pageination/>
            </div>
        </MainLayout>
    );
}

export default Customers;
