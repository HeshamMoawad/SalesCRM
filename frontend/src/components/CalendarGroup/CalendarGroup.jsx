import React from 'react';
import './CalendarGroup.css';
import Calendar from '../Calendar/Calendar';

const CalendarGroup = ({start_date , end_date,setDateFrom,setDateTo , isDisabled=false}) => {
    return (
        <div className='calendar-group' isDisabled={isDisabled}>
            <Calendar date={start_date} label='Started At' setTime={setDateFrom} isDisabled={isDisabled}/>
            <Calendar date={end_date} label='Ended At' setTime={setDateTo} isDisabled={isDisabled}/>
        </div>
    );
}

export default CalendarGroup;
