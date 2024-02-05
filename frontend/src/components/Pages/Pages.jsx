import React from 'react';
import SideBar from './SideBar/SideBar';
import ContentBar from './ContentBar/ContentBar';


const Pages = () => {
    return (
        <div className='pages'>
            <SideBar/>
            <ContentBar/>
        </div>
    );
}

export default Pages;
