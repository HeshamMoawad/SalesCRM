import React from "react";
import "./DCard.css";

const DCard = ({ logo, name , count}) => {
    
    return (
        <div className="d-card">
            <div className="bg-img">
                <img src={logo} alt="" />
            </div>
            <div className="txt">
                <div className="header-txt">
                    <span className="count">{count}</span>
                </div>
                <div className="light-txt">
                    <span className="name">{name}</span>
                </div>
            </div>
        </div>
    );
};

export default DCard;
