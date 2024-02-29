import React from 'react';
import './Pageination.css';

const Pageination = ({currentPage , setCurrentPage , hasMore }) => {
    const nextIsDisabled = hasMore.next ? false : true ;
    const prevIsDisabled = hasMore.prev ? false : true ;
    return (
        <div className='pageination-area'>
            <div className='pageination'>
                <button className='prev' onClick={(e)=>{
                    setCurrentPage(prev=>{return prev - 1})
                }} disabled={prevIsDisabled}>
                    Prev
                </button>
                <button className='current' disabled >
                    {currentPage}
                </button>
                <button className='next' onClick={(e)=>{
                    if (hasMore.next){
                        setCurrentPage(prev=>{return prev + 1})
                    }
                }} disabled={nextIsDisabled}>
                    Next
                </button>
                <label className='count'>Count : {hasMore.count}</label>
            </div>
        </div>
    );
}

export default Pageination;
