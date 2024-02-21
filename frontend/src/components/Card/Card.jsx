import React from "react";
import "./Card.css";
import { MANAGER } from "../../Hooks";
import { Link } from "react-router-dom";

export const CUSTOMER = "CUSTOMER";
export const SUBSCRIPTION = "SUBSCRIPTION";

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
const covertData =(data)=>{
    const uuid = data?.uuid ;
    const created_at = new Date(data?.created_at).toLocaleDateString();
    const by = data?.creator.username;
    const name = data?.name ? data.name : data?.customer?.name;
    const phone = data?.phone ? data.phone : data?.customer?.phone;
    const project = data?.project?.name ? data?.project?.name : data?.customer?.project?.name
    return {
        uuid ,
        created_at ,
        by ,
        name ,
        project ,
        phone
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
                    {type === CUSTOMER ? "Created" : "Subscriptioned"} at : {info.created_at}
                    
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
                        <button className="btn">Delete</button>
                    </div>
                </div>
                {type !== CUSTOMER ? null : (
                    <div className="subscription">
                        <button>Add Subscription</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
