import React from "react";
import DCard from "./DCrad/DCard";
import "./DashboardCards.css";
import CustomSelection from "../CustomSelection/CustomSelection";
import {useProjectsFetcher} from "../../Hooks/fetchers";

const DashboardCards = (props) => {
    const {projects} = useProjectsFetcher()
    return (
        <div className="dashboard-cards">
            <div className="row">
                <DCard key={Math.random()} />
                <DCard key={Math.random()} />
                <DCard key={Math.random()} />
                <DCard key={Math.random()} />
            </div>
            {projects.length > 0 ? (
                <CustomSelection options={projects} defaultIndex={0} />
            ) : null}
        </div>
    );
};

export default DashboardCards;
