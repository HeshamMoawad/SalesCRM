import { useEffect, useState } from "react";
import request , { SUCCESS_STATUS_CODES } from "../utils/requests";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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


export const useCustomersFetcher = (page , setHasMore) => {
    const [loading , setLoading] = useState(true);
    const [customers , setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    const customersFetch = async ( pageNumber , show = [false, true] )=>{
        const response = await request(
            "/customers",
            "GET",
            show,
            {page:pageNumber , ...convertTextToParams(search)} ,
            {},
        );
        if (response !== undefined && SUCCESS_STATUS_CODES.includes(response.status)) {
            // success 
            setCustomers(response.data.results)
            setHasMore({
                next :response.data.next ,
                prev : response.data.previous,
                count : response.data.results.length ,
            })
        }else {
            setCustomers([])
        }
    };
    useEffect(()=>{
        setLoading(true)
        customersFetch(page);
        setLoading(false)
        return ()=>{
            console.log("unmouted" ,  new Date().getTime())
        }
    } ,[search , page]);
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
            setCustomer(response.data.results[0])
            
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
        setCustomer
    };
} 

export const saveEditedCustomer = async (data , show = [false, true])=>{
    const response = await request(
        "/customers",
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
            text: response.data.message ,
            icon:'error',
        })
        window.location.reload();
    }

}
export const addNewCustomer = async (data , show = [false, true])=>{
    // const navigate = useNavigate();
    const response = await request(
        "/customers",
        "POST",
        show,
        {} ,
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
        // window.location.pathname = '/customers';
        return response.data.uuid
        // navigate("/customers")

    }else {
        await Swal.fire({
            title:"Faild" ,
            text: response.data.message ,
            icon:'error',
        })
        // window.location.reload();
        return null
    }

}

export const deleteCustomer = async (uuid , show = [false, false])=>{
    const response = await request(
        "/customers",
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
        // return response.data.uuid
        // navigate("/customers")

    }else {
        await Swal.fire({
            title:"Faild" ,
            text: response?.data?.message ,
            icon:'error',
        })
        // window.location.reload();
        return null
    }

}