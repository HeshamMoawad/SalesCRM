import React, { useEffect, useState } from "react";
import DCard from "./DCrad/DCard";
import "./DashboardCards.css";
import CustomSelection from "../CustomSelection/CustomSelection";
import request , {FETCH} from '../../utils/requests';
import { usePermission , MANAGER} from "../../Hooks";

const DashboardCards = (props) => {
    const {permission} = usePermission()
    const [projects , setProjects] = useState([]);
    const fetchProjects = async()=>{
        const {data} =  await request("/projects" , FETCH , [false,false])
        setProjects(data)
    }
    useEffect(()=>{
        if (permission.role === MANAGER){
            fetchProjects();
        }
    } , [])

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
