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


const AddSubscription = () => {
    const { customerId } = useParams();
    const [date , setDate] = useState({
        start_date:new Date().toISOString(),
        end_date:new Date().toISOString(),
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
    useEffect(()=>{
        console.log(form , 'form')
        console.log(date , 'date')
        console.log(prices , 'prices')

    },[form ,date , prices])

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
                <div className="add-subscription-body">
                    {customer ? (
                        <>
                        <div className="text">
                            <label>Subscription Text</label>
                            <textarea 
                            name="text" 
                            id="" 
                            cols="30" 
                            rows="10" 
                            placeholder="Write any thing About Customer or Subscription ... "
                            onChange={writeHandler}
                            > 
                            </textarea>
                        </div>
                        <PriceContainer
                        setPrice={(value)=>{
                            setPrices({
                                ...prices ,
                                price:value
                            })
                        }}
                        setCollected={(value)=>{
                            setPrices({
                                ...prices ,
                                collected_price:value
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
                                    setForm({
                                        ...form ,
                                        cs:value
                                    })
                                }}
                                />
                        </div>
                        {/* <Calendar/> */}
                        <CalendarGroup
                        setDateFrom={(value)=>{
                            setDate({
                                ...date ,
                                start_date : value
                            })
                        }}
                        setDateTo={(value)=>{
                            setDate({
                                ...date ,
                                end_date : value
                            })
                        }}
                        />
                        <div className="btns">
                            <Link to={'/subscriptions'}>
                            <button className="cancel">cancel</button>
                            </Link>
                            <button className="save" onClick={async ()=>{
                                await addSubscription({...form , ...date , ...prices})
                                console.log({...form , ...date , ...prices})
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
