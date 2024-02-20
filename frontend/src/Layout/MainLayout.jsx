import React  from 'react';
// import {Outlet} from 'react-router-dom';
import SideBar from "../components/SideBar/SideBar";
import "./MainLayout.css";

const MainLayout = ({children , initToggle }) => {
    // {
    //     Dashboard: false,
    //     Customers: false,
    //     Subscriptions:false,
    // }
    return (
        <>
            <SideBar initToggle={initToggle}/>
            <div className="content-bar">
                {children}
            </div>
        </>
    );
}

export default MainLayout;
