import React from 'react';
import './EndCard.css';
import { Link } from 'react-router-dom';
import { getStatus } from '../../utils/time';

const EndCard = ({subscription}) => {
    const {uuid} = subscription;
    const Status = getStatus(new Date(subscription?.end_date) , new Date(subscription?.now))
    console.log(Status)
    return (
        <div className='end-card' style={{
            border:`1px solid ${Status < 0 ? 'red' : 'orange'}`
        }} >
            <div className="info-row">
                <label>Status : {Status < 0 ? 'Ended' : 'Valid'} || days : {Status}</label>
                <Link to={`/subscriptions/view/${uuid}`}>
                    <button className='btn'>View</button>
                </Link>
            </div>
            <div className="info-row">
                <label>{subscription?.customer?.project?.name} : البروجيكت</label>
                <label>CS : {subscription?.cs?.username}</label>
            </div>
            <div className="info-row">
                <label>سعر الاشتراك : {subscription?.price}</label>
                <label>تم تحصيل : {subscription?.collected_price}</label>
                <label>المتبقى : {subscription?.price-subscription?.collected_price}</label>
            </div>
            <div className="info-row">
                <label>{subscription?.customer?.name} : الاسم</label>
                <label>الرقم : {subscription?.customer?.phone}</label>
            </div>
        </div>
    );
}

export default EndCard;
