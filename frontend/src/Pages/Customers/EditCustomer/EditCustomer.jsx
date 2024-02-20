import React from "react";
import "./EditCustomer.css";
import MainLayout from "../../../Layout/MainLayout";
import { useParams } from "react-router-dom";
// import Loading from "../../../components/Loading/Loading";

const EditCustomer = (props) => {
    const { customerId } = useParams();
    const { view } = props;
    const isDisabled = view ? true : false;
    return (
        <MainLayout
            initToggle={{
                Dashboard: false,
                Customers: true,
                Subscriptions: false,
            }}
        >
            <div className="edit-customer-container">
                <div className="edit-form">
                    <div className="edited">
                        <div className="id">
                            <label htmlFor="id">ID :</label>
                            <input type="text" value={customerId} disabled />
                        </div>

                        <div className="name">
                            <label htmlFor="name">Name :</label>
                            <input
                                type="text"
                                value={"محمد القحطانى اللى مقحطنا خالص"}
                                placeholder="name"
                                disabled={isDisabled}
                            />
                        </div>
                        <div className="phone">
                            <label htmlFor="name">Phone :</label>
                            <input
                                type="text"
                                value={"+966548796321"}
                                placeholder="phone"
                                disabled={isDisabled}
                            />
                        </div>
                        <div className="created">
                            <label htmlFor="created">Created At :</label>
                            <input type="text" value={"11/8/2023"} disabled />
                        </div>
                        <div className="by">
                            <label htmlFor="by">Created by :</label>
                            <input type="text" value={"saif"} disabled />
                        </div>

                        <div className="sub">
                            <label htmlFor="sub">Subscriptions :</label>
                            <input type="text" value={"5"} disabled />
                        </div>
                    </div>
                    <div className="updates">
                        <label className="header">Updates</label>
                        <div className="update">
                            <label htmlFor="name">Updated by: saif </label>
                            <label htmlFor="by">
                                Updated at : 25/2/2023 11:56
                            </label>
                        </div>
                        <div className="update">
                            <label htmlFor="name">Updated by: saif </label>
                            <label htmlFor="by">
                                Updated at : 25/2/2023 11:56
                            </label>
                        </div>
                        <div className="update">
                            <label htmlFor="name">Updated by: saif </label>
                            <label htmlFor="by">
                                Updated at : 25/2/2023 11:56
                            </label>
                        </div>
                    </div>
                    {view ? 
                    (
                        <div className="btns">
                        <button className="cancel"> back </button>
                        </div>

                    ) :
                    (
                        <div className="btns">
                            <button className="cancel">cancel</button>
                            <button className="save">save</button>
                            <button className="save-add">
                                save & Add Subscription
                            </button>
                        </div>
                    )  }
                </div>
            </div>
        </MainLayout>
    );
};

export default EditCustomer;
