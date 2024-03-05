import React from "react";
import "./Card.css";
import { MANAGER } from "../../Hooks";
import { Link } from "react-router-dom";
import { getDate } from "../../utils/time";
import Swal from "sweetalert2";
import { deleteCustomer } from "../../Hooks/customers";
import { deleteSubscription } from "../../Hooks/subscriptions";

export const CUSTOMER = "CUSTOMER";
export const SUBSCRIPTION = "SUBSCRIPTION";


const covertData =(data)=>{
    const uuid = data?.uuid ;
    const created_at = getDate(data?.created_at);
    const by = data?.creator?.username;
    const name = data?.name ? data.name : data?.customer?.name;
    const phone = data?.phone ? data.phone : data?.customer?.phone;
    const project = data?.project?.name ? data?.project?.name : data?.customer?.project?.name
    const deuration = data?.deuration
    return {
        uuid ,
        created_at ,
        by ,
        name ,
        project ,
        phone ,
        deuration
    }
}
const Card = ({ role, type = CUSTOMER  , data }) => {
    const info = covertData(data)
    return (
        <div className="card">
            <div className="info">
                <label className="name" htmlFor="name">
                    Name : {info.name}
                </label>
                <label className="phone" htmlFor="phone">
                    Phone : {info.phone}
                </label>
                <label className="created" htmlFor="created">
                    {type === CUSTOMER ? "Created" : "Create Sub"} at : {info.created_at}
                </label>
                <label className="by" htmlFor="by">
                    By: {info.by}
                </label>
                {role === MANAGER ? (
                    <label className="project" htmlFor="by">
                        Project: {info.project}
                    </label>
                ) : null}
            </div>
            {
                info.deuration ? (
                <div className="mid">
                    <label>
                        مدة الاشتراك : {info.deuration}
                    </label>
                </div>

                ):
                null
            }
            <div className="actions">
                <div className="crud">
                    <div className="view">
                        <Link to={`view/${info.uuid}`}>
                            <button className="btn">View</button>
                        </Link>
                    </div>
                    <div className="edit">
                        <Link to={`edit/${info.uuid}`}>
                            <button className="btn">Edit</button>
                        </Link>
                    </div>
                    <div
                        className="delete"
                        style={{
                            visibility: role === MANAGER ? "" : "hidden",
                        }}
                    >
                        <button className="btn" onClick={async()=>{
                            const result = await Swal.fire({
                                title: `Are you sure to delete ${type === CUSTOMER ? "Customer" : "Subscription"} with \n${info.phone}\n\n${info.uuid}?`,
                                showCancelButton: true,
                                confirmButtonText: "Delete",
                                denyButtonText: `Cancel`
                              })
                            
                            if (result.isConfirmed) {
                                if (type === CUSTOMER){
                                    await deleteCustomer(info.uuid);
                                }else {
                                    await deleteSubscription(info.uuid);
                                }
                                
                            }    
                            }}>Delete</button>
                    </div>
                </div>
                {type !== CUSTOMER ? null : (
                    <div className="subscription">
                        <Link to={`/subscriptions/add/${info.uuid}`}>
                        <button>Add Subscription</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
