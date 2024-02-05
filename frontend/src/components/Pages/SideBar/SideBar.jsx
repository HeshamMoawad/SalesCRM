import React, { useState } from "react";
import SideHeader from "./SideHeader/SideHeader";
import SideButton from "./SideButton/SideButton";
import "./SideBar.css";

import ndlogo from "../../../assets/icons/dashboard-white.jpg";
import tdlogo from "../../../assets/icons/dashboard-blue.jpg";

import nclogo from "../../../assets/icons/customers-white.jpg";
import tclogo from "../../../assets/icons/customers-blue.jpg";

const SideBar = () => {
    const Logos = {
        Dashboard: {
            nlogo: ndlogo,
            tlogo: tdlogo,
        },
        Customers: {
            nlogo: nclogo,
            tlogo: tclogo,
        },
    };

    const [toggled, setToggled] = useState({
        Dashboard: false,
        Customers: false,
    });

    return (
        <div className="sidebar">
            <SideHeader name="Mohamed ahmed" project="Trading" />
            <div className="content">
                {Object.entries(toggled).map(([key, value]) => (
                    <SideButton
                        key={key}
                        name={key}
                        nlogo={Logos[key]["nlogo"]}
                        tlogo={Logos[key]["tlogo"]}
                        toggled={value}
                        toggledObject={toggled}
                        setToggled={setToggled}
                    />
                ))}

                <button className="logout">Log out</button>
            </div>
        </div>
    );
};

export default SideBar;
