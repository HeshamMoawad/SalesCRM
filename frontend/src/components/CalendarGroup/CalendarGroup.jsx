import React from 'react';
import './CalendarGroup.css';
import Calendar from '../Calendar/Calendar';

const CalendarGroup = ({setDateFrom,setDateTo}) => {
    return (
        <div className='calendar-group'>
            <Calendar label='Started At' setTime={setDateFrom}/>
            <Calendar label='Ended At' setTime={setDateTo}/>
        </div>
    );
}

export default CalendarGroup;
