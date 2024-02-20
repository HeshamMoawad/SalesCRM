import React from "react";
import "./DCard.css";
import logo from "../../../assets/icons/sales-blue.jpg";

const DCard = () => {
    
    return (
        <div className="d-card container">
            <div className="bg-img">
                <img src={logo} alt="" />
            </div>
            <div className="txt">
                <div className="header-txt">
                    <span className="count">300k</span>
                </div>
                <div className="light-txt">
                    <span className="name">sales</span>
                </div>
            </div>
        </div>
    );
};

export default DCard;
