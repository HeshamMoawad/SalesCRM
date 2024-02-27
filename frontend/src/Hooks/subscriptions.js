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


export const useSubscriptionsFetcher = () => {
    const [loading , setLoading] = useState(true);
    const [subscriptions , setSubscriptions] = useState([]);
    const [search, setSearch] = useState("");

    const subscriptionsFetch = async (show = [false, true] )=>{
        const response = await request(
            "/subscriptions",
            "GET",
            show,
            convertTextToParams(search) ,
            {},
        );
        if (response !== undefined && SUCCESS_STATUS_CODES.includes(response.status)) {
            // success 
            setSubscriptions(response.data)
        }else {
            setSubscriptions([])
        }
    };
    useEffect(()=>{
        setLoading(true)
        subscriptionsFetch();
        setLoading(false)
        return ()=>{
            console.log("unmouted" ,  new Date().getTime())
        }
    } ,[search]);
    return {
        subscriptionsFetch , 
        loading ,
        subscriptions ,
        setSearch
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
            icon:'info',
        })
        window.location.pathname = '/subscriptions';
        console.log("true" , response)
        // navigate("/customers")
    }else {
        await Swal.fire({
            title:"Faild" ,
            text: response.data.message ,
            icon:'warning',
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
            icon:'info',
        })
        window.location.reload();
    }else {
        await Swal.fire({
            title:"Faild" ,
            text: response?.data?.message ,
            icon:'warning',
        })
        return null
    }

}