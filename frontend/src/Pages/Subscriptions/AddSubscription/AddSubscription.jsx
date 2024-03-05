import React, { useEffect, useState } from "react";
import MainLayout from "../../../Layout/MainLayout";
import { useParams , Link } from "react-router-dom";
import { useCustomerFetcher } from "../../../Hooks/customers";
import "./AddSubscription.css";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";
import PriceContainer from "../../../components/PriceContainer/PriceContainer";
import CalendarGroup from "../../../components/CalendarGroup/CalendarGroup";
import CustomSelection from "../../../components/CustomSelection/CustomSelection";
import { useCSFetcher } from "../../../Hooks/fetchers";
import { addSubscription } from "../../../Hooks/subscriptions";
import { getDate } from "../../../utils/time";
import {DEURATION_VALIDATION} from "../../../utils";

import Deuration from "../../../components/Deuration/Deuration";
import Swal from "sweetalert2";


const AddSubscription = () => {
    const { customerId } = useParams();
    const [date , setDate] = useState({
        start_date:new Date().toLocaleDateString(),
        end_date:new Date().toLocaleDateString(),
    });
    const [prices , setPrices] = useState({
        price:0,
        collected_price:0,
    });
    const [form , setForm] = useState({}); 
    const { customer, loading } = useCustomerFetcher(customerId);
    const {cs} = useCSFetcher();

    useEffect(()=>{
        if (customer) {
            setForm({...form , customer_uuid:customer.uuid})
        }
    },[customer])
    const writeHandler = (e)=>{
        setForm({
            ...form ,
            [e.target.name] : e.target.value
        })
    }
    // useEffect(()=>{
    //     console.log(form , 'form')
    //     console.log(date , 'date')
    //     console.log(prices , 'prices')

    // },[form ,date , prices])

    return (
        <MainLayout
            initToggle={{
                Dashboard: false,
                Customers: false,
                Subscriptions: true,
            }}
        >
            <div className="add-subscription">
                {customer ? (
                    <div className="add-subscription-header">
                        <div className="ID">Customer</div>
                        <div className="name">Name : {customer.name}</div>
                        <div className="phone">Phone : {customer.phone}</div>
                    </div>
                ) : (
                    <DataNotFound/>
                )}
                <div className="add-subscription-body" style={{
                    justifyContent:'space-around'
                }}>
                    {customer ? (
                        <>
                        <div className="text">
                            <label>التفاصيل</label>
                            <textarea 
                            name="text" 
                            id="" 
                            cols="30" 
                            rows="10" 
                            placeholder="...اكتب تفاصيل الاشتراك "
                            onChange={writeHandler}
                            > 
                            </textarea>
                        </div>
                        <Deuration  
                        value={form?.deuration}
                        setDeuration={(value)=>{
                            setForm(formPrev => {
                                return {
                                ...formPrev ,
                                deuration:value
                                }
                            })
                            
                        }}/>
                        <PriceContainer
                        setPrice={(value)=>{

                            setPrices(pricesPrev => {
                                return {
                                    ...pricesPrev ,
                                    price:value
                                }
                            })
                        }}
                        setCollected={(value)=>{
                            setPrices(pricesPrev => {
                                return {
                                    ...pricesPrev ,
                                    collected_price:value
                                }
                            })
                        }}
                        prices = {prices}
                        />
                        <div className="cs">
                                <CustomSelection 
                                options={cs} 
                                defaultIndex={0} 
                                child={(<label htmlFor="phone">CS : </label>)}
                                setSelection = {(value)=>{
                                    setForm(formPrev => {
                                        return {
                                        ...formPrev ,
                                        cs:value
                                        }
                                    })
                                }}
                                />
                        </div>
                        {/* <Calendar/> */}
                        <CalendarGroup
                        start_date={date?.start_date}
                        end_date={date?.end_date}
                        setDateFrom={(value)=>{
                            setDate(prev =>{
                                return{...prev ,start_date : value}
                            })
                        }}
                        setDateTo={(value)=>{
                            setDate(prev => {
                                return{...prev ,end_date : value}
                            })
                        }}
                        />
                        <div className="btns">
                            <Link to={'/subscriptions'}>
                            <button className="cancel">cancel</button>
                            </Link>
                            <button className="save" onClick={async ()=>{
                                // console.log(form , DEURATION_VALIDATION.test(form.deuration) ,form.deuration  )
                                if (+prices.price <= 0 ){
                                    await Swal.fire({
                                        title:"Validation Error" ,
                                        text: 'الرجاء كتابة سعر الاشتراك' ,
                                        icon:'error',
                                    })

                                }else if (!DEURATION_VALIDATION.test(form?.deuration) | form?.deuration === '' | form?.deuration === undefined){
                                    await Swal.fire({
                                        title:"Validation Error" ,
                                        text: 'الرجاء كتابة مدة الاشتراك' ,
                                        icon:'error',
                                    })

                                }else if (+prices?.collected_price <= 0){
                                    await Swal.fire({
                                        title:"Validation Error" ,
                                        text: 'الرجاء اخذ مبلغ من العميل' ,
                                        icon:'error',
                                    })
                                
                                }else if (date?.start_date === date?.end_date){
                                    await Swal.fire({
                                        title:"Validation Error" ,
                                        text: 'الرجاء التاكد من زمن الاشتراك' ,
                                        icon:'error',
                                    })
                                }
                                else {
                                    console.log({...form , ...date , ...prices  , customer_uuid:customer?.uuid})

                                    await addSubscription({...form , ...date,  ...prices ,  customer_uuid:customer?.uuid})

                                }
                            }}>save</button>
                        </div>
                        </>
                    ):(
                        null
                    )}
                </div>

            </div>
        </MainLayout>
    );
};

export default AddSubscription;
