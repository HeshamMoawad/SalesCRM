import React , {useState , useCallback} from 'react';
import { getDate } from '../../utils/time';
import './Calendar.css';

import { Calendar as CalendarComp } from '@natscale/react-calendar';
// import '@natscale/react-calendar/dist/main.css';

const HIDDEN = 'hidden'
const VISIABLE = 'visiable'

const Calendar = ({date, setTime , label='start' , isDisabled=false}) => {
    const [visibility , setVisibility] = useState(HIDDEN);
    const [value, setValue] = useState(date ? new Date(date)  : new Date());

    const onClick = (e)=>{
        if (visibility === HIDDEN){
            setVisibility(VISIABLE)
        }else {
            setVisibility(HIDDEN)
        }
    }
    const onChange = useCallback(
        (val) => {
          setValue(val.toLocaleDateString());
          setVisibility(HIDDEN)
          if (setTime){
            setTime(val.toLocaleDateString())
            // console.log(val , 'calendar')
          }
          
        },
        [setValue],
      );
    
    return (
        <div className='calendar' disabled={isDisabled}>
            <div>
                <button type="text" onClick={onClick} disabled={isDisabled}>{getDate(value,false)}</button>
                <label> : {label}</label>
            </div>
            <div className='calendar-comp'  disabled={isDisabled}>
                {
                    visibility === HIDDEN ?
                    null :(
                        <CalendarComp 
                        onChange={onChange}
                        value={value}
                        size={200}
                        />
                    )
                }

            </div>
            

        </div>
    );
}

export default Calendar;
