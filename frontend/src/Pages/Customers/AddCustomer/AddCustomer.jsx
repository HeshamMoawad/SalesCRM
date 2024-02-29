import React, { useState } from "react";
import "./AddCustomer.css";
import MainLayout from "../../../Layout/MainLayout";
import { MANAGER, usePermission } from "../../../Hooks";
import CustomSelection from "../../../components/CustomSelection/CustomSelection";
import { addNewCustomer } from "../../../Hooks/customers";
import { useProjectsFetcher } from "../../../Hooks/fetchers";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
    const [form , setForm] = useState({name:'',phone:''});
    const { permission } = usePermission();
    const {projects} = useProjectsFetcher();
    const navigate = useNavigate();
    const writeHandler = (e)=>{
        setForm({
            ...form ,
            [e.target.name] : e.target.value
        })
    }
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
                        <input type="text" 
                            name="name"
                            placeholder="name"  
                            onChange={writeHandler}
                            />
                    </div>
                    <div className="phone">
                        <label htmlFor="phone">Phone : </label>
                        <input
                            type="text"
                            placeholder="+9665XXXXXXXX or 05XXXXXXXX"
                            name="phone"
                            onChange={writeHandler}
                        />
                    </div>
                    {permission.role === MANAGER ? (
                        <div className="project">
                            <CustomSelection 
                                options={projects} 
                                defaultIndex={0} 
                                setSelection = {(value)=>{
                                    setForm({
                                        ...form ,
                                        project:value
                                    })
                                }}
                                child={(<label htmlFor="phone">Project : </label>)}
                            />
                        </div>
                    ) : (
                        null
                    )}
                    <div className="btns">
                        <button className="cancel">cancel</button>
                        <button className="save" onClick={async()=>{
                            const uuid = await addNewCustomer(form)
                            if (uuid !== null) {
                                navigate(`/customers`)
                            }
                        }}>save</button>
                        <button className="save-add" onClick={async()=>{
                            const uuid = await addNewCustomer(form)
                            if (uuid !== null) {
                                navigate(`/subscriptions/add/${uuid}`)
                            }
                        }}>
                            save & Add Subscription
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AddCustomer;
