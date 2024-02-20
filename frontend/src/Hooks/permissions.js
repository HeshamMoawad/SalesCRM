import React, { useContext, createContext , useState } from "react";
// import request , {ADD_NEW} from "../utils/requests";

export const permissionContext = createContext();

export function PermissionContextProvider ({ children }) {
    const [permission , setPermission] = useState({
        role:null,
        isAuthenticated:false ,
    });
    return <permissionContext.Provider value={{ permission , setPermission }}>
            {children}
           </permissionContext.Provider>;
}

export const usePermission = () => {
    return useContext(permissionContext);

};

export const MANAGER = "MANAGER";
export const SALES = "SALES";
export const CS = "CS";
