import React from "react";
import MainLayout from "../../Layout/MainLayout";
import "./Customers.css";
import Pageination from "../../components/Pageination/Pageination";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { usePermission } from "../../Hooks";
import { useCustomersFetcher } from "../../Hooks/customers";
import DataNotFound from "../../components/DataNotFound/DataNotFound";

const Customers = () => {
    const { permission } = usePermission();
    const { loading, customers, setSearch } = useCustomersFetcher();

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
                    ) : customers.length > 0 ? (
                        
                        customers.map((customer) => {
                            return (
                                <Card
                                    role={permission.role}
                                    key={customer.uuid}
                                    data={customer}
                                />
                            );
                        })
                    ) : (
                        <DataNotFound/>
                    )}
                </div>
                <Pageination />
            </div>
        </MainLayout>
    );
};

export default Customers;
