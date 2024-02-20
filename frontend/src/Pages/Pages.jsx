import React from 'react';
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Login from "./Login/Login" ;
import DashBoard from './DashBoard/DashBoard';
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Customers from "./Customers/Customers";
import Subscriptions from "./Subscriptions/Subscriptions";
import AddCustomer from './Customers/AddCustomer/AddCustomer';
import EditCustomer from './Customers/EditCustomer/EditCustomer';

// import NotFound from './NotFound/NotFound';

const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='login' element ={<Login/>} />
                <Route path="" element={<PrivateRoute/>}>
                    <Route path='dashboard/' element ={<DashBoard/>} />
                    <Route path='customers' element ={<Customers/>}/>
                    <Route path='customers/add' element={<AddCustomer/>}/>
                    <Route path='customers/view/:customerId' element={<EditCustomer view={true}/>}/>
                    <Route path='customers/edit/:customerId' element={<EditCustomer />}/>

                    <Route path='subscriptions/' element = {<Subscriptions/>}/>
                    {/* <Route path='subscriptions/add/:customerId' element={}/> */}
                    {/* <Route path='subscriptions/view/:subscriptionId' element={}/> */}
                    {/* <Route path='subscriptions/edit/:subscriptionId' element={}/> */}

                    {/* <Route element = {<NotFound/>}/> */}
                    {/* <Route index element={<Default/>}/> */}
                               
                </Route>

            </Routes>
        </BrowserRouter>
  
    );
}

export default Pages;
