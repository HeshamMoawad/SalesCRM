import React from "react";
import "./AddCustomer.css";
import MainLayout from "../../../Layout/MainLayout";
import { MANAGER, usePermission } from "../../../Hooks";
import CustomSelection from "../../../components/CustomSelection/CustomSelection";

const AddCustomer = () => {
    const { permission } = usePermission();
    return (
        <MainLayout
            initToggle={{
                Dashboard: false,
                Customers: true,
                Subscriptions: false,
            }}
        >
            <div className="add-customer-container">
                <div className="add-form">
                    <div className="name">
                        <label htmlFor="name">Name : </label>
                        <input type="text" placeholder="name" />
                    </div>
                    <div className="phone">
                        <label htmlFor="phone">Phone : </label>
                        <input
                            type="text"
                            placeholder="+9665XXXXXXXX or 05XXXXXXXX"
                        />
                    </div>
                    {permission.role === MANAGER ? (
                        <div className="project">
                            <CustomSelection child={(<label htmlFor="phone">Project : </label>)}/>
                        </div>
                    ) : (
                        null
                    )}
                    <div className="btns">
                        <button className="cancel">cancel</button>
                        <button className="save">save</button>
                        <button className="save-add">
                            save & Add Subscription
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AddCustomer;
