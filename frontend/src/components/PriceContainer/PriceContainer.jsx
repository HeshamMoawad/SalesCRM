import React, { useEffect, useRef, useState } from 'react';
import './PriceContainer.css';


const PriceContainer = ({setPrice , setCollected , prices}) => {
    const priceRef = useRef();
    const collectedRef = useRef();
    const [remaining , setRemaining] = useState(0);

    const changePriceHandler = (e)=>{
        setRemaining(
            priceRef.current.value - collectedRef.current.value
        )
        if (e.target.name === 'price'){
            
            setPrice(parseInt(e.target.value))
        }else {
            setCollected(parseInt(e.target.value))
        }
    }
    useEffect(()=>{
        setPrice(0)
        setCollected(0)
    },[])
    return (
        <div className='price-container'>
            <div className="price">
                <label htmlFor="price">Subscription Price :</label>
                <input type="number" name='price' className='price' ref={priceRef} onChange={changePriceHandler} value={prices.price}/>
            </div>
            <div className="collected-price">
                <label htmlFor="price">Collected :</label>
                <input type="number" name='collected_price' ref={collectedRef} onChange={changePriceHandler} className='collected-price' value={prices.collected_price}/>
            </div>
            <div className="remaining-pay " >
                <label htmlFor="price">Remaining to Pay :</label>
                <input type="number" className='remaining-pay' value={remaining} disabled/>
            </div>

        </div>
    );
}

export default PriceContainer;
