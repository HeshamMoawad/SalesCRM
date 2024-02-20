import React, { useEffect, useState } from 'react';
import './Pageination.css';

const Pageination = (props) => {

    const [currentPage , setCurrentPage] = useState(1)

    useEffect(()=>{

    }, [currentPage])

    return (
        <div className='pageination-area'>
            <div className='pageination'>
                <button className='prev'>
                    Prev
                </button>
                <button className='current' disabled >
                    {currentPage}
                </button>
                <button className='next'>
                    Next
                </button>

            </div>
        </div>
    );
}

export default Pageination;
