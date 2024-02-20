import React from 'react';
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Login from "./Login/Login" ;
import DashBoard from './DashBoard/DashBoard';
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Customers from "./Customers/Customers";
import Subscriptions from "./Subscriptions/Subscriptions";

const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='login' element ={<Login/>} />
                <Route path="" element={<PrivateRoute/>}>
                    <Route path='dashboard/' element ={<DashBoard/>} />
                    <Route path='customers/' element ={<Customers/>} />
                    <Route path='subscriptions' element = {<Subscriptions/>}/> 

                    {/* <Route index element={<Default/>}/> */}
                    {/* 
                    <Route element = {<NotFound/>}/> 
                    */}                
                </Route>

            </Routes>
        </BrowserRouter>
  
    );
}

export default Pages;
