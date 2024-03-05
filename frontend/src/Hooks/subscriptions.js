import { useEffect, useState } from "react";
import request , { SUCCESS_STATUS_CODES } from "../utils/requests";
// import axios from "axios";
import Swal from "sweetalert2";

const reverseDate = (text)=>{
    const arr = text.split("/")
    return `${arr[2]}-${arr[1]}-${arr[0]}`
}
const convertTextToParams = (text)=>{
    const phoneRegex = /^[/+]?\d+$/;
    const dateRegex = /^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/\d{4}$/;
    if(text === '' ){
        return {}
    }else if (phoneRegex.test(text)){
        return {
            customer__phone__contains : text
        }
    }else if (dateRegex.test(text)){
        return {
            created_at__date : reverseDate(text)
        }
    }else {
        return {
            customer__name__contains : text
        }
    }
}


export const useSubscriptionsFetcher = (page , setHasMore) => {
    const [loading , setLoading] = useState(true);
    const [subscriptions , setSubscriptions] = useState([]);
    const [search, setSearch] = useState("");

    const subscriptionsFetch = async (pageNumber , show = [false, true] )=>{
        const response = await request(
            "/subscriptions",
            "GET",
            show,
            {page:pageNumber , ...convertTextToParams(search)} ,
            {},
        );
        if (response !== undefined && SUCCESS_STATUS_CODES.includes(response.status)) {
            // success 
            setSubscriptions(response.data.results)
            setHasMore({
                next :response.data.next ,
                prev : response.data.previous ,
                count : response.data.results.length ,
            })

        }else {
            setSubscriptions([])
        }
    };
    useEffect(()=>{
        setLoading(true)
        subscriptionsFetch(page);
        setLoading(false)
        return ()=>{
            console.log("unmouted" ,  new Date().getTime())
        }
    } ,[search , page]);
    return {
        subscriptionsFetch , 
        loading ,
        subscriptions ,
        setSearch
    };
}
export const useSubscriptionFetcher = (uuid) => {
    const [loading , setLoading] = useState(true);
    const [subscription , setSubscription] = useState(null);

    const subscriptionFetch = async (show = [false, true] )=>{
        const response = await request(
            "/subscriptions",
            "GET",
            show,
            {uuid},
            {},
        );
        if (response !== undefined && SUCCESS_STATUS_CODES.includes(response.status)) {
            // success 
            setSubscription(response.data.results[0])
            // setSubscription({})
        }
    };
    useEffect(()=>{
        setLoading(true)
        subscriptionFetch();
        setLoading(false)
        return ()=>{
            console.log("unmouted" ,  new Date().getTime())
        }
    } ,[]);
    return {
        subscriptionFetch , 
        loading ,
        subscription ,
        setSubscription
    };
}


export const addSubscription = async (data,show = [false, false] )=>{
    
    const response = await request(
        "/subscriptions",
        "POST",
        show,
        {},
        {...data},
    );
    if (response?.data?.uuid){
        await Swal.fire({
            title:"Success" ,
            text: "added Successfully" ,
            icon:'success',
            showConfirmButton: false,
            timer: 1000
        })
        window.location.pathname = '/subscriptions';
        console.log("true" , response)
    }else {
        await Swal.fire({
            title:"Faild" ,
            text: response?.data?.message ,
            icon:'error',
        })

        // window.location.reload();
    }
};

export const deleteSubscription = async (uuid , show = [false, false])=>{
    const response = await request(
        "/subscriptions",
        "DELETE",
        show,
        {uuid:uuid} ,
        {},
    );
    if (response?.data?.uuid){
        await Swal.fire({
            title:"Success" ,
            text: "deleted Successfully" ,
            icon:'success',
            showConfirmButton: false,
            timer: 1000
        })
        window.location.reload();
    }else {
        await Swal.fire({
            title:"Faild" ,
            text: response?.data?.message ,
            icon:'error',
        })
        return null
    }
}

export const saveEditedSubscription = async (data , show = [false, false])=>{
    const response = await request(
        "/subscriptions",
        "PUT",
        show,
        {} ,
        {...data},
    );
    if (response?.data?.uuid){
        await Swal.fire({
            title:"Success" ,
            text: "updated Successfully" ,
            icon:'success',
            showConfirmButton: false,
            timer: 1000
        })
        window.location.reload();
    }else {
        await Swal.fire({
            title:"Faild" ,
            text: response?.data?.message ,
            icon:'error',
        })
        // window.location.reload();
    }
}