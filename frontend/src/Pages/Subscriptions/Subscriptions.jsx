import React , {useState} from "react";
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
    const [hasMore , setHasMore] = useState({next:null , prev:null , count:0});
    const [currentPage , setCurrentPage] = useState(1);
    const { loading, subscriptions, setSearch } = useSubscriptionsFetcher(currentPage , setHasMore);
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
                <Pageination  currentPage={currentPage} hasMore={hasMore} setCurrentPage={setCurrentPage}/>
            </div>
        </MainLayout>
    );
};

export default Subscriptions;
