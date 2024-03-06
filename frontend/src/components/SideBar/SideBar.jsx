import React, { useState } from "react";
import SideHeader from "./SideHeader/SideHeader";
import SideButton from "./SideButton/SideButton";
import NormalDashBoardLogo from "../../assets/icons/dashboard-white.jpg";
import ToggledDashBoardLogo from "../../assets/icons/dashboard-blue.jpg";
import NormalCustomersLogo from "../../assets/icons/customers-white.jpg";
import ToggledCustomersLogo from "../../assets/icons/customers-blue.jpg";
import NormalSubscriptionsLogo from "../../assets/icons/subscription-white.png";
import ToggledSubscriptionsLogo from "../../assets/icons/subscription-blue.png";
import "./SideBar.css";
import { useLogout } from "../../Hooks/login";

const SideBar = (props) => {
    const {initToggle} = props;
    const Logos = {
        Dashboard: {
            nlogo: NormalDashBoardLogo,
            tlogo: ToggledDashBoardLogo,
            path:'/dashboard',
        },
        Customers: {
            nlogo: NormalCustomersLogo,
            tlogo: ToggledCustomersLogo,
            path:'/customers',
        },
        Subscriptions : {
            nlogo: NormalSubscriptionsLogo,
            tlogo: ToggledSubscriptionsLogo,
            path:'/subscriptions',
        }
    };
    const [toggled, setToggled] = useState(initToggle);
    const {logout , auth , permission} = useLogout();
    const logoutHandler =  (e) => {
        e.preventDefault();
        logout();
    }

    return (
        <div className="sidebar">
            <SideHeader name={auth?.first_name} project={auth?.project?.name} logo={auth?.project?.logo} role={permission?.role}/>
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
                        path={Logos[key]["path"]}
                    />
                ))}
                <button onClick={logoutHandler} className="logout">Log out</button>
            </div>
        </div>
    );
};

export default SideBar;
