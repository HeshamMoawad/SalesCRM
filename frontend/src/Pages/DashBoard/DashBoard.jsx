import React, { useState } from 'react';
import "./DashBoard.css";
import DashboardCards from '../../components/DashboardCards/DashboardCards';
import MainLayout from '../../Layout/MainLayout';
import { useAnalyticsFetcher , useProjectsFetcher } from '../../Hooks/fetchers';

const DashBoard = () => {
    const {projects} = useProjectsFetcher();
    const [currentProject , setCurrentProject ] = useState('');
    // const [otherFilter , setOtherFilter] = useState('')
    const {analytics } = useAnalyticsFetcher(currentProject);

    return (
        <MainLayout initToggle={{
            Dashboard: true,
            Customers: false,
            Subscriptions:false,
        }}>
            <div className='dashborad'>
                <DashboardCards projects={projects} setProject={setCurrentProject} analytics={analytics}/>
            </div>
        </MainLayout>
    );
}

export default DashBoard;
