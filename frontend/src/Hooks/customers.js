import { useEffect, useState } from "react";
import request , { SUCCESS_STATUS_CODES } from "../utils/requests";


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
            phone__contains : text
        }
    }else if (dateRegex.test(text)){
        return {
            created_at__date : reverseDate(text)
        }
    }else {
        return {
            name__contains : text
        }
    }
}


export const useCustomersFetcher = () => {
    const [loading , setLoading] = useState(true);
    const [customers , setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    const customersFetch = async (show = [false, true] )=>{
        const response = await request(
            "/customers",
            "GET",
            show,
            convertTextToParams(search) ,
            {},
        );
        if (response !== undefined && SUCCESS_STATUS_CODES.includes(response.status)) {
            // success 
            setCustomers(response.data)
        }else {
            setCustomers([])
        }
    };
    useEffect(()=>{
        setLoading(true)
        customersFetch();
        setLoading(false)
        return ()=>{
            console.log("unmouted" ,  new Date().getTime())
        }
    } ,[search]);
    return {
        customersFetch , 
        loading ,
        customers ,
        setSearch
    };
}


export const useCustomerFetcher = (uuid) => {
    const [loading , setLoading] = useState(true);
    const [customer , setCustomer] = useState(null);
    const customerFetch = async (show = [false, true] )=>{
        const response = await request(
            "/customers",
            "GET",
            show,
            {uuid} ,
            {},
        );
        console.log(`\n${response !== undefined && SUCCESS_STATUS_CODES.includes(response.status)}\n`)
        if (response !== undefined && SUCCESS_STATUS_CODES.includes(response.status)) {
            // success 
            setCustomer(response.data[0])
            
        }else {
            setCustomer(null)
        }
    };
    useEffect(()=>{
        setLoading(true)
        customerFetch();
        setLoading(false)
        
    } ,[]);
    return {
        customerFetch , 
        loading ,
        customer ,
    };
}

