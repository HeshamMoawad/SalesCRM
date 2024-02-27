import React , {useState , useCallback} from 'react';
import { getDate } from '../../utils/time';
import './Calendar.css';

import { Calendar as CalendarComp } from '@natscale/react-calendar';
// import '@natscale/react-calendar/dist/main.css';

const HIDDEN = 'hidden'
const VISIABLE = 'visiable'

const Calendar = ({setTime , label='start'}) => {
    const [visibility , setVisibility] = useState(HIDDEN);
    const [value, setValue] = useState(new Date());

    const onClick = (e)=>{
        if (visibility === HIDDEN){
            setVisibility(VISIABLE)
        }else {
            setVisibility(HIDDEN)
        }
    }
    const onChange = useCallback(
        (val) => {
          setValue(val);
          setVisibility(HIDDEN)
          if (setTime){
            setTime(val.toISOString())
            // console.log(val , 'calendar')
          }
          
        },
        [setValue],
      );
    
    return (
        <div className='calendar'>
            <div>
                <label>{label} :</label>
                <button type="text" onClick={onClick}>{getDate(value.toUTCString(),false)}</button>
            </div>
            <div className='calendar-comp' >
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
