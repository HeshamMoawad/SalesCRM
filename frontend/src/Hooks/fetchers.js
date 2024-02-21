import request , {GET} from '../utils/requests';
import { usePermission , MANAGER} from "./permissions";
import { useState , useEffect} from 'react';

export const useProjectsFetcher = ()=>{
    const {permission} = usePermission()
    const [projects , setProjects] = useState([]);
    const fetchProjects = async()=>{
        const {data} =  await request("/projects" , GET , [false,false])
        setProjects(data)
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