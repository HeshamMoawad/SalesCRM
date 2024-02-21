import React, { useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import "./Customers.css";
import Pageination from "../../components/Pageination/Pageination";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { usePermission } from "../../Hooks";
import { useCustomersFetcher } from "../../Hooks/customers";

const Customers = () => {
    const { permission } = usePermission();
    const { loading, customers, customersFetch, setSearch } = useCustomersFetcher();

    return (
        <MainLayout
            initToggle={{
                Dashboard: false,
                Customers: true,
                Subscriptions: false,
            }}
        >
            <div className="customers">
                <SearchBar
                    addPath={"customers/add"}
                    headerName={"Customers"}
                    setSearch={setSearch}
                />
                <div className="customers-card-container">
                    {loading ? (
                        <Loading />
                    ) : (
                        customers.map((customer)=>{
                            return (
                                <Card role={permission.role} key={customer.uuid} data={customer} />
                            )
                        })
                    )}
                </div>
                <Pageination />
            </div>
        </MainLayout>
    );
};

export default Customers;
