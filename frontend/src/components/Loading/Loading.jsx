import React from 'react';
import "./Loading.css";

const Loading = ({width,height}) => {
    return (
        <div className='loading-container' style={{width:width,height:height}}> 
            <div className="loading"></div>
        </div>
    );
}

export default Loading;
