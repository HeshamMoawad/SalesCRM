import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import request , { SUCCESS_STATUS_CODES } from "../utils/requests";
import { saveLogin , savePermission} from "./save";
import { usePermission } from "./permissions";
import { useAuth } from "./auth";



export const useLogin = ()=>{
    const { auth, setAuth } = useAuth();
    const {permission,setPermission} = usePermission();
    const navigate = useNavigate();

    const login = async (show = [false, true] , payload={} ) => {
        const response = await request(
            "/login",
            "POST",
            show,
            {},
            payload
        );
        if (response !== undefined && SUCCESS_STATUS_CODES.includes(response.status)) {
            localStorage.setItem("Authorization", response.data.Authorization);
            setPermission({
                role: response.data.role,
                isAuthenticated:true ,
            })
            savePermission({
                role: response.data.role,
                isAuthenticated:true ,
            })
            setAuth(response.data);
            saveLogin(response.data)
        }
    };
    useEffect(() => {
        if (auth) {
            navigate("/dashboard");
        }
    }, [auth]);
    useEffect(()=>{
        login([false, false]);
    } , []);
    return {
        login ,
        permission ,
        auth 
    }
}

export const useLogout = ()=>{
    const {auth , setAuth} = useAuth();
    const {permission , setPermission} = usePermission();
    const navigate = useNavigate();

    const logout = async (show = [true, false]) => {
        const response = await request(
            "/logout",
            "GET",
            show,
            {},
        );
        localStorage.clear()
        setAuth(null)
        setPermission(null)
        navigate("/login")
    };
    return {
        logout ,
        auth ,
        permission
    }
}


