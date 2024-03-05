import React  from 'react';
// import {Outlet} from 'react-router-dom';
import SideBar from "../components/SideBar/SideBar";
import "./MainLayout.css";
import { useAuth , usePermission} from '../Hooks';

const MainLayout = ({children , initToggle }) => {
    // {
    //     Dashboard: false,
    //     Customers: false,
    //     Subscriptions:false,
    // }
    const {auth} = useAuth();
    const {permission } = usePermission();

    return auth && permission.isAuthenticated ? (
        <>
            <SideBar initToggle={initToggle}/>
            <div className="content-bar">
                {children}
            </div>
        </>
        ): null ;
    
}

export default MainLayout;
