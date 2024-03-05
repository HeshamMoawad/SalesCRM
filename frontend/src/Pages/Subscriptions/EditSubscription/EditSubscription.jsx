import React, { useEffect, useState } from "react";
import MainLayout from "../../../Layout/MainLayout";
import { useParams, Link } from "react-router-dom";
import "./EditSubscription.css";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";
import PriceContainer from "../../../components/PriceContainer/PriceContainer";
import CalendarGroup from "../../../components/CalendarGroup/CalendarGroup";
import CustomSelection from "../../../components/CustomSelection/CustomSelection";
import { useCSFetcher } from "../../../Hooks/fetchers";
import {
    saveEditedSubscription,
    useSubscriptionFetcher,
} from "../../../Hooks/subscriptions";
import Updates from "../../../components/Updates/Updates";
import Notes from "../../../components/Notes/Notes";
import Deuration from "../../../components/Deuration/Deuration";
import {DEURATION_VALIDATION} from "../../../utils";
import Swal from "sweetalert2";



const EditSubscription = ({ isDisabled = false }) => {
    const { subscriptionId } = useParams();
    const { subscription , loading } = useSubscriptionFetcher(subscriptionId);
    const [form, setForm] = useState({});
    const [prices, setPrices] = useState({});

    const { cs } = useCSFetcher();

    useEffect(() => {
        console.log(subscription,"rerendering EditSubscription")
        if (subscription) {
            // console.log( ,  , 'prices')
            setForm({
                uuid: subscription?.uuid,
                cs: subscription?.cs?.username,
                // start_date: new Date(subscription.start_date).toLocaleDateString(),
                end_date: new Date(subscription?.end_date).toLocaleDateString(),
                text: subscription?.text,
                deuration : subscription?.deuration
            });
            setPrices({
                price : subscription?.price ,
                collected_price : subscription?.collected_price
            })
        }
    }, [subscription , loading]);
    const writeHandler = (e) => {
        setForm((prev) => {
            return {
                ...prev,
                text: e.target.value,
            };
        });
    };
    return (
        <MainLayout
            initToggle={{
                Dashboard: false,
                Customers: false,
                Subscriptions: true,
            }}
        >
            <div className="add-subscription">
                {subscription?.customer ? (
                    <div className="add-subscription-header">
                        <div className="ID">Customer</div>
                        <div className="name">
                            Name : {subscription.customer.name}
                        </div>
                        <div className="phone">
                            Phone : {subscription.customer.phone}
                        </div>
                    </div>
                ) : (
                    <DataNotFound />
                )}
                <div className="add-subscription-body">
                    {subscription?.customer ? (
                        <>
                            <div className="text">
                                <label>Subscription Text</label>
                                <textarea
                                    name="text"
                                    id=""
                                    cols="30"
                                    rows="10"
                                    placeholder="Write any thing About Customer or Subscription ... "
                                    value={form?.text}
                                    onChange={writeHandler}
                                    disabled={isDisabled}
                                ></textarea>
                            </div>
                            <Deuration  
                            isDisabled={isDisabled}
                            value={form?.deuration}
                            setDeuration={(value)=>{
                                setForm({
                                    ...form ,
                                    deuration:value
                                })
                            }}/>

                            <PriceContainer
                                isDisabled={isDisabled}
                                setPrice={(value) => {
                                    setPrices((prev) => {
                                        return { ...prev, price: value };
                                    });
                                }}
                                setCollected={(value) => {
                                    setPrices((prev) => {
                                        return {
                                            ...prev,
                                            collected_price: value,
                                        };
                                    });
                                }}
                                prices={prices}
                            />
                            <div className="cs" disabled={isDisabled}>
                                <CustomSelection
                                    isDisabled={isDisabled}
                                    options={cs}
                                    defaultIndex={0}
                                    initvalue={subscription?.cs?.username}
                                    child={<label htmlFor="phone">CS : </label>}
                                    setSelection={(value) => {
                                        setForm((prev) => {
                                            return { ...prev, cs: value };
                                        });
                                    }}
                                />
                            </div>
                            <CalendarGroup
                                isDisabled={isDisabled}
                                isDisabledStart={true}
                                start_date={new Date(
                                    subscription?.start_date
                                ).toLocaleDateString()}
                                end_date={new Date(
                                    subscription?.end_date
                                ).toLocaleDateString()}
                                setDateFrom={(value) => {
                                    // setForm((prev) => {
                                    //     return { ...prev }; 
                                    // });
                                }}
                                setDateTo={(value) => {
                                    setForm((prev) => {
                                        return { ...prev, end_date: value };
                                    });
                                }}
                            />
                            <Notes subscriptionId={subscriptionId} isDisabled={isDisabled}/>
                            <Updates customer={subscription} />
                            <div className="btns">
                                <Link to={"/subscriptions"}>
                                    <button className="cancel">cancel</button>
                                </Link>
                                {isDisabled ? null : (
                                    <button
                                        className="save"
                                        onClick={async () => {
                                            // console.log({...form  , ...prices })
                                            console.log(form , DEURATION_VALIDATION.test(form?.deuration) , form?.deuration  )
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

                                            }else if (+prices.collected_price <= 0){
                                                await Swal.fire({
                                                    title:"Validation Error" ,
                                                    text: 'الرجاء اخذ مبلغ من العميل' ,
                                                    icon:'error',
                                                })
                                            
                                            }else {
                                                console.log({...form  , ...prices })
                                                await saveEditedSubscription({...form ,  ...prices })
                                            }
                                        }}
                                    >
                                        save
                                    </button>
                                )}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </MainLayout>
    );
};

export default EditSubscription;
