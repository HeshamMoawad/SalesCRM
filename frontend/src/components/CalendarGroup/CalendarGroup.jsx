import React from 'react';
import './CalendarGroup.css';
import Calendar from '../Calendar/Calendar';

const CalendarGroup = ({start_date , end_date,setDateFrom,setDateTo , isDisabled=false , isDisabledStart=false}) => {
    return (
        <div className='calendar-group' isDisabled={isDisabled}>
            <Calendar date={start_date} label='تاريخ بداية الاشتراك' setTime={setDateFrom} isDisabled={isDisabledStart}/>
            <Calendar date={end_date} label='تاريخ نهاية الاشتراك' setTime={setDateTo} isDisabled={isDisabled}/>
        </div>
    );
}

export default CalendarGroup;
