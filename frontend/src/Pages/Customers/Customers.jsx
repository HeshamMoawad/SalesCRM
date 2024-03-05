import React, { useState } from "react";
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
    const [hasMore , setHasMore] = useState({next:null , prev:null , count:0});
    const [currentPage , setCurrentPage] = useState(1);
    const { loading, customers, setSearch } = useCustomersFetcher(currentPage , setHasMore);

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
                    ) : customers?.length > 0 ? (
                        
                        customers.map((customer) => {
                            return (
                                <Card
                                    role={permission.role}
                                    key={customer?.uuid}
                                    data={customer}
                                />
                            );
                        })
                    ) : (
                        <DataNotFound/>
                    )}
                </div>
                <Pageination  currentPage={currentPage} hasMore={hasMore} setCurrentPage={setCurrentPage}/>
            </div>
        </MainLayout>
    );
};

export default Customers;
