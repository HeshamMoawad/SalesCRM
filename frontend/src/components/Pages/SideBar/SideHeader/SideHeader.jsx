import React from "react";
import "./SideHeader.css";
import logo from "../../../../assets/images/alamia.jpg";

const SideHeader = (props) => {
    // const {name , project , logo } = props ;
    const {name , project  } = props ;
    return (
        <div className="side-header container">
            <img src={logo} alt="" />
            <div>
                <span className="name">{name}</span>
                <br />
                <span className="project">{project}</span>
            </div>
        </div>
    );
};

export default SideHeader;
