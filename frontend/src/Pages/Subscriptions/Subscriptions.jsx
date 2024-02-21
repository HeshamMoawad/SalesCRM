import React from 'react';
import MainLayout from '../../Layout/MainLayout';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pageination from '../../components/Pageination/Pageination';
import "./Subscriptions.css";
import Card , {SUBSCRIPTION} from '../../components/Card/Card';
import { usePermission } from '../../Hooks';
// import Loading from "../../components/Loading/Loading";

const Subscriptions = () => {
    const {permission} = usePermission();
    return (
        <MainLayout initToggle={{
            Dashboard: false,
            Customers: false,
            Subscriptions:true,
        }}>
            <div className="subscriptions">
                <SearchBar headerName={"Subscriptions"}/>
                <div className="subscriptions-card-container">
                    <Card role={permission.role} type={SUBSCRIPTION}/>
                    <Card role={permission.role} type={SUBSCRIPTION}/>
                    <Card role={permission.role} type={SUBSCRIPTION}/>
                    <Card role={permission.role} type={SUBSCRIPTION}/>
                    <Card role={permission.role} type={SUBSCRIPTION}/>
                    <Card role={permission.role} type={SUBSCRIPTION}/>
                    <Card role={permission.role} type={SUBSCRIPTION}/>
                    <Card role={permission.role} type={SUBSCRIPTION}/>
                    <Card role={permission.role} type={SUBSCRIPTION}/>
                    {/* <Loading/> */}
                </div>
                <Pageination/>
            </div>

        </MainLayout>
    );
}

export default Subscriptions;
