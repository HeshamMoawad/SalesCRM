import request , {GET} from '../utils/requests';
import { usePermission , MANAGER} from "./permissions";
import { useState , useEffect} from 'react';

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
        permission ,
        projects
    }
}

export const useNoteFetcher = (subscriptionId)=>{
    const [notes , setNotes] = useState([]);
    const [loading , setLoading] = useState(false);
    const fetchNotes = async()=>{
        const response =  await request("/notes" , GET , [false,false])
        // console.log(response?.data)
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