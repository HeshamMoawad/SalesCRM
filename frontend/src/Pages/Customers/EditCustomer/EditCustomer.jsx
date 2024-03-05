import React from "react";
import "./EditCustomer.css";
import MainLayout from "../../../Layout/MainLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCustomerFetcher , saveEditedCustomer } from "../../../Hooks/customers";
import Loading from "../../../components/Loading/Loading";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";
import { getDate } from "../../../utils/time";
import Updates from "../../../components/Updates/Updates";



const EditCustomer = (props) => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const {customer , loading , setCustomer } = useCustomerFetcher(customerId);
    const isDisabled = props.view ? true : false;
    const editHandler = (e)=>{
        setCustomer({
            ...customer ,
            [e.target.name] : e.target.value
        });
    }
    return (
        <MainLayout
            initToggle={{
                Dashboard: false,
                Customers: true,
                Subscriptions: false,
            }}
        >
            <div className="edit-customer-container">
                {
                     customer ? 
                    (
                        <div className="edit-form">
                            <div className="edited">
                                <div className="id">
                                    <label htmlFor="id">ID :</label>
                                    <input type="text" value={customer.uuid} disabled />
                                </div>

                                <div className="name">
                                    <label htmlFor="name">Name :</label>
                                    <input
                                        type="text"
                                        value={customer.name}
                                        placeholder="name"
                                        disabled={isDisabled}
                                        name="name"
                                        onChange={editHandler}
                                    />
                                </div>
                                <div className="phone">
                                    <label htmlFor="name">Phone :</label>
                                    <input
                                        type="text"
                                        value={customer.phone}
                                        placeholder="phone"
                                        disabled={isDisabled}
                                        name="phone"
                                        onChange={editHandler}
                                    />
                                </div>
                                <div className="created">
                                    <label htmlFor="created">Created At : </label>
                                    <input type="text" value={getDate(customer.created_at)} disabled />
                                </div>
                                <div className="by">
                                    <label htmlFor="by">Created by :</label>
                                    <input type="text" value={customer.creator.username} disabled />
                                </div>

                                <div className="sub">
                                    <label htmlFor="sub">Subscriptions :</label>
                                    <input type="text" value={customer.subscriptions} disabled />
                                </div>
                            </div>
                            <Updates customer={customer}/>
                            {props.view ? 
                            (
                                <div className="btns">
                                    <Link to={'/customers'}>
                                    <button className="cancel"> back </button>
                                    </Link>
                                
                                </div>
                            ) :
                            (
                                <div className="btns">
                                    <Link to={'/customers'}>
                                    <button className="cancel">cancel</button>
                                    </Link>
                                    <button className="save" onClick={()=>{saveEditedCustomer({uuid : customer.uuid,name : customer.name , phone : customer.phone})}}>save</button>
                                    <button className="save-add" onClick={async (e)=>{
                                        await saveEditedCustomer({uuid : customer.uuid,name : customer.name , phone : customer.phone} ,[false, true] , false );
                                        // navigate to add subscription
                                        navigate(`/subscriptions/add/${customer.uuid}`)
                                        }}>
                                        save & Add Subscription
                                    </button>
                                </div>
                            )  }
                        </div>
                    ):
                    loading ?(<Loading/>):
                    (<DataNotFound/>) 
                }
            </div>
        </MainLayout>
    );
};

export default EditCustomer;
