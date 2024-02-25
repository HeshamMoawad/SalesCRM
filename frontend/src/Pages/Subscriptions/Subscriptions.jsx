import React from "react";
import MainLayout from "../../Layout/MainLayout";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pageination from "../../components/Pageination/Pageination";
import "./Subscriptions.css";
import Card, { SUBSCRIPTION } from "../../components/Card/Card";
import { usePermission } from "../../Hooks";
import { useSubscriptionsFetcher } from "../../Hooks/subscriptions";
import Loading from "../../components/Loading/Loading";
import DataNotFound from "../../components/DataNotFound/DataNotFound";

const Subscriptions = () => {
    const { permission } = usePermission();
    const { loading, subscriptions, setSearch } = useSubscriptionsFetcher();
    return (
        <MainLayout
            initToggle={{
                Dashboard: false,
                Customers: false,
                Subscriptions: true,
            }}
        >
            <div className="subscriptions">
                <SearchBar headerName={"Subscriptions"} setSearch={setSearch} />
                <div className="subscriptions-card-container">
                    {loading ? (
                        <Loading />
                    ) : subscriptions.length > 0 ? (
                        subscriptions.map((subscription) => {
                            return (
                                <Card
                                    type={SUBSCRIPTION}
                                    role={permission.role}
                                    key={subscription.uuid}
                                    data={subscription}
                                />
                            );
                        })
                    ) : (
                        <DataNotFound />
                    )}

                    {/* <Loading/> */}
                </div>
                <Pageination />
            </div>
        </MainLayout>
    );
};

export default Subscriptions;
