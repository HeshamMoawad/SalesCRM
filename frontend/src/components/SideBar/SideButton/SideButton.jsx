import React, { useEffect, useState } from "react";
import "./SideButton.css";
import { useNavigate } from "react-router-dom";

const SideButton = (props) => {
    const { name, nlogo, tlogo, toggled, setToggled, toggledObject , path} = props;
    const [icon, setIcon] = useState(nlogo);
    const navigate = useNavigate();

    useEffect(() => {
        if (toggled) {
            setIcon(tlogo);
        } else {
            setIcon(nlogo);
        }
    }, [toggledObject]);
    return (
        <>
            <div
                className={`side-button${toggled ? " toggled" : ""}`}
                onClick={() => {
                    var Localtoggled = { ...toggledObject };
                    for (const key in Localtoggled) {
                        if (Localtoggled.hasOwnProperty(key)) {
                            if (key === name) {
                                Localtoggled[key] = !toggled;
                                if (Localtoggled[key]) {
                                    setIcon(tlogo);
                                } else {
                                    setIcon(nlogo);
                                }
                            } else {
                                Localtoggled[key] = false;
                            }
                        }
                    }
                    setToggled(Localtoggled);
                    navigate(path)
                }}
            >
                <img src={icon} alt="" />
                {name}
            </div>
        </>
    );
};

export default SideButton;
