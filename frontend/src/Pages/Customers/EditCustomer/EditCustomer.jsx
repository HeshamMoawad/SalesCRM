import React, { useState } from "react";
import "./EditCustomer.css";
import MainLayout from "../../../Layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { useCustomerFetcher } from "../../../Hooks/customers";
import Loading from "../../../components/Loading/Loading";

// {
//     "uuid": "0871f5dc-b6b6-4e7e-b58f-ab074a57433c",
//     "creator": {
//         "username": "ahmed",
//         "first_name": "Ahmed",
//         "project": {
//             "name": "dddqwe",
//             "logo": "/media/projects-logo/2111.w013.n001.577B.p30.577.jpg"
//         },
//         "is_active": true,
//         "role": "CS"
//     },
//     "project": {
//         "name": "dddqwe",
//         "logo": "/media/projects-logo/2111.w013.n001.577B.p30.577.jpg"
//     },
//     "name": "dhdasdبسشwqeqweqweشبس",
//     "phone": "+966598788623",
//     "created_at": "2024-02-13T07:38:35.115425Z"
// }
const getDate = (_date)=>{
    const date = new Date(_date)
    const arr = date.toLocaleDateString().split("/")
    return `${arr[1]}/${arr[0]}/${arr[2]}  ${date.toLocaleTimeString()}`
}
const EditCustomer = (props) => {
    const { customerId } = useParams();
    const {customer , loading } = useCustomerFetcher(customerId)
    const [data,setData] = useState(customer);
    const isDisabled = props.view ? true : false;
    const editHandler = (e)=>{
        setData({
            ...data ,
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
            <div className="edit-customer-container">
                {
                    !loading && customer ? 
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
                            <div className="updates">
                                <label className="header">Updates</label>
                                {
                                    customer?.updates ?
                                    customer.updates.map((update)=>{
                                        return (
                                            <div className="update">
                                                <label htmlFor="name">Updated by: {update.user?.username} </label>
                                                <label htmlFor="by">
                                                    Updated at : {getDate(update.created_at)}
                                                </label>
                                            </div>

                                        )
                                    }):
                                    null
                                }
                            </div>
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
                                    <button className="save">save</button>
                                    <button className="save-add">
                                        save & Add Subscription
                                    </button>
                                </div>
                            )  }
                        </div>
                    ):
                    (
                        <Loading/>
                    )
                }
            </div>
        </MainLayout>
    );
};

export default EditCustomer;
