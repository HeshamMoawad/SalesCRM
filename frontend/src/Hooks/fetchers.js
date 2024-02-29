import request , {GET, POST} from '../utils/requests';
import { usePermission , MANAGER} from "./permissions";
import { useState , useEffect} from 'react';
import Swal from 'sweetalert2';

export const useProjectsFetcher = ()=>{
    const {permission} = usePermission()
    const [projects , setProjects] = useState([]);
    const fetchProjects = async()=>{
        const response =  await request("/projects" , GET , [false,false])
        console.log(response?.data)
        if (response?.data){
            setProjects(response.data)
        }
    }
    useEffect(()=>{
        if (permission.role === MANAGER){
            fetchProjects();
        }
    } , [])
    return {
        projects ,
        fetchProjects
    }
}

export const useNotesFetcher = (subscriptionId)=>{
    const [notes , setNotes] = useState([]);
    const [loading , setLoading] = useState(false);
    const fetchNotes = async()=>{
        const response =  await request(
            "/notes" , 
            GET , 
            [false,false] ,
            {subscription_uuid:subscriptionId} ,
            {}
            )
        if (response?.data){
            setNotes(response.data)
        }
    }
    useEffect(()=>{
        setLoading(true)
        fetchNotes();
        setLoading(false)
    } , [])
    return {
        notes , 
        fetchNotes ,
        loading
    }
}

export const useCSFetcher = ()=>{
    const {permission} = usePermission()
    const [cs , setCS] = useState([]);
    const fetchCS = async(params={})=>{
        const response =  await request("/cs" , GET , [false,false] , params)
        if (response?.data){
            setCS(response.data)
        }
    }
    useEffect(()=>{
        if (permission.role === MANAGER){
            fetchCS({});
        }else {
            fetchCS({});
        }


        
    } , [])
    return {
        cs ,
        fetchCS
    }
}


export const saveNote = async (subscriptionId , data)=>{
    const response =  await request(
        "/notes" , 
        POST , 
        [false,false] ,
        {} ,
        {...data,subscription_uuid:subscriptionId}
        )
    // console.log(response?.data)
    if (response?.data?.created_at){
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
    }
    
    return {
    }
}

