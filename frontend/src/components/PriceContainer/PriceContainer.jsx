import React, { useEffect, useRef, useState } from 'react';
import './PriceContainer.css';


const PriceContainer = ({setPrice , setCollected , prices , isDisabled=false}) => {
    const priceRef = useRef();
    const collectedRef = useRef();
    // const [localPrices , setLocalPrices] = useState(prices)
    const [remaining , setRemaining] = useState(0);

    const changePriceHandler = (e)=>{
        if (e.target.name === 'price'){ 
            setPrice(+e.target.value)
            // setLocalPrices(prev =>{return {...prev , price:+e.target.value}})
        }else if (e.target.name === 'collected_price'){
            setCollected(+e.target.value)
            // setLocalPrices(prev =>{return {...prev , collected_price:+e.target.value}})
        }
        console.log(e.target.name)
    }
    useEffect(()=>{
        setRemaining(+prices.price - +prices.collected_price)
        // setPrice(prices.price)
        // setCollected(prices.collected_price)
        // setRemaining(parseInt(prices.price) - parseInt(prices.collected_price))
        console.log(prices)
    },[prices])
    return (
        <div className='price-container' disabled={isDisabled}>
            <div className="price">
                <label htmlFor="price">سعر الاشتراك </label>
                <input type="number" disabled={isDisabled} name='price' className='price' ref={priceRef} onChange={changePriceHandler} value={prices.price}/>
            </div>
            <div className="collected-price">
                <label htmlFor="price">المبلغ المحصل</label>
                <input type="number" disabled={isDisabled} name='collected_price' ref={collectedRef} onChange={changePriceHandler} className='collected-price' value={prices.collected_price}/>
            </div>
            <div className="remaining-pay " >
                <label htmlFor="price">المتبقى</label>
                <input type="number" disabled={isDisabled} className='remaining-pay' value={remaining}/>
            </div>

        </div>
    );
}

export default PriceContainer;
