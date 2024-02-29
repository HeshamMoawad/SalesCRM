import React from 'react';
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Login from "./Login/Login" ;
import DashBoard from './DashBoard/DashBoard';
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Customers from "./Customers/Customers";
import Subscriptions from "./Subscriptions/Subscriptions";
import AddCustomer from './Customers/AddCustomer/AddCustomer';
import EditCustomer from './Customers/EditCustomer/EditCustomer';
import AddSubscription from './Subscriptions/AddSubscription/AddSubscription';
import EditSubscription from './Subscriptions/EditSubscription/EditSubscription';

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
                    <Route path='customers/edit/:customerId' element={<EditCustomer view={false}/>}/>

                    <Route path='subscriptions/' element = {<Subscriptions/>}/>
                    <Route path='subscriptions/add/:customerId' element={<AddSubscription/>}/>
                    <Route path='subscriptions/view/:subscriptionId' element={<EditSubscription isDisabled={true}/>}/>
                    <Route path='subscriptions/edit/:subscriptionId' element={<EditSubscription/>}/>

                    {/* <Route element = {<NotFound/>}/> */}
                    {/* <Route index element={<Default/>}/> */}
                               
                </Route>

            </Routes>
        </BrowserRouter>
  
    );
}

export default Pages;
