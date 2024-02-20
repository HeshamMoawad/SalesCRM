import React from "react";
import "./CustomerCard.css";
import { MANAGER } from "../../Hooks";

const CustomerCard = (props) => {
    const {role} = props;

    return (
        <div className="customer-card">
            <div className="info">
                <label className="name" htmlFor="name">
                    Name : محمد القحطانى اللى مقحطنا خالص
                </label>
                <label className="phone" htmlFor="phone">
                    Phone : +966548756321
                </label>
                <label className="created" htmlFor="created">
                    Created at: 11/2/2023 11:25
                </label>
                <label className="by" htmlFor="by">
                    By: saif
                </label>
            </div>
            <div className="actions">
                <div className="crud">
                    <div className="view">
                        <button className="btn">View</button>
                    </div>
                    <div className="edit">
                        <button className="btn">Edit</button>
                    </div>
                    <div
                        className="delete"
                        style={{
                            visibility:
                                role === MANAGER ? "" : "hidden",
                        }}
                    >
                        <button className="btn">Delete</button>
                    </div>
                </div>
                <div className="subscription">
                    <button>Add Subscription</button>
                </div>
            </div>
        </div>
    );
};

export default CustomerCard;
