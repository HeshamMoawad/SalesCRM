import React from "react";
import DCard from "./DCrad/DCard";
import "./DashboardCards.css";
import CustomSelection from "../CustomSelection/CustomSelection";
import logo from "../../assets/icons/sales-blue.jpg";
import EndCard from "../EndCard/EndCard";
// import DataNotFound from '../DataNotFound/DataNotFound';
import { usePermission, MANAGER } from "../../Hooks/permissions";

const DashboardCards = ({ projects, setProject ,analytics }) => {
    const { permission } = usePermission();
    return (
        <div className="dashboard-cards">
            {permission.role === MANAGER ? (
                <>
                    {" "}
                    <div className="row">
                        <DCard
                            logo={logo}
                            count={`${+analytics?.total_prices}  SAR`}
                            name={"اجمالى سعر الاشتراكات"}
                            key={Math.random()}
                        />
                        <DCard
                            logo={logo}
                            count={`${+analytics?.total_collected}  SAR`}
                            name={"المدفوع"}
                            key={Math.random()}
                        />
                        <DCard
                            logo={logo}
                            count={`${
                                analytics?.total_prices -
                                analytics?.total_collected
                            }  SAR`}
                            name={"المتبقى"}
                            key={Math.random()}
                        />
                        <DCard
                            logo={logo}
                            count={analytics?.subscriptions_count}
                            name={"اجمالى عدد الاشتراكات"}
                            key={Math.random()}
                        />
                    </div>
                    <div className="row">
                        <DCard
                            logo={logo}
                            count={analytics?.current_subscriptions}
                            name={"الاشتراكات السارية"}
                            key={Math.random()}
                        />

                        <DCard
                            logo={logo}
                            count={analytics?.unpaid_subscriptions}
                            name={"اشتراكات عليها فلوس"}
                            key={Math.random()}
                        />

                        <DCard
                            logo={logo}
                            count={`${
                                analytics?.subscriptions_count
                                    ? parseInt(
                                          analytics?.total_prices /
                                              analytics?.subscriptions_count
                                      )
                                    : 0
                            }  SAR`}
                            name={"اشتراك / سعر"}
                            key={Math.random()}
                        />
                        {/* <DCard logo={logo} count={analytics?.current_subscriptions} name={'Subscriptions'} key={Math.random()} /> */}
                    </div>
                </>
            ) : null}
            {projects?.length > 0 ? (
                <div className="container">
                    <CustomSelection
                        options={projects}
                        defaultIndex={0}
                        // initvalue={subscription.cs.username}
                        child={<label htmlFor="phone">Projects : </label>}
                        setSelection={setProject}
                    />
                    {/* 
                    <CustomSelection
                        key={Math.random()}
                        options={[{name:'الكل'} , {name:'اشتراكات عليها فلوس'}]}
                        defaultIndex={0}
                        // initvalue={subscription.cs.username}
                        child={<label htmlFor="filters">Filters : </label>}
                        setSelection={setOtherFilter}
                    />
                    */}
                </div>
            ) : null}
            <div className="row">
                <label className="end-label">
                    {" "}
                    {analytics?.ending_soon?.length} : اشتراكات قاربت على
                    الانتهاء او منتهية 
                </label>
                <div
                    className="scrollable"
                    style={{
                        height: permission.role === MANAGER ? "45vh" : "75vh",
                    }}
                >
                    {
                        analytics?.ending_soon?.length >= 0
                            ? analytics?.ending_soon.map((subscription) => {
                                  return (
                                      <EndCard
                                          subscription={subscription}
                                          key={Math.random()}
                                      />
                                  );
                              })
                            : null
                        //<DataNotFound/>
                    }
                </div>
            </div>
        </div>
    );
};

export default DashboardCards;
