import React from 'react';
import './Deuration.css';


const Deuration = ({setDeuration , isDisabled=false , value = ''}) => {
    const onChangeHandler = (e)=>{
        setDeuration(e.target.value)
    }

    return (
        <div className='deuration'>
            <input type="text" name='deuration' pattern='\S.*' value={value} onChange={onChangeHandler} disabled={isDisabled} placeholder='اكتب مدة الاشتراك'/>
            <label>مدة الاشتراك </label>
        </div>
    );
}

export default Deuration;
