import React from 'react';
import SideBar from "./SideBar/SideBar" ;
import ContentBar from './ContentBar/ContentBar';
import "./DashBoard.css";

const DashBoard = () => {
    return (
        <div className='dashborad'>
            <SideBar/>
            <ContentBar/>
        </div>
    );
}

export default DashBoard;
