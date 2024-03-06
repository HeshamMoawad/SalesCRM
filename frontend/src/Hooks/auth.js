import React, { useContext, createContext , useState } from "react";
import { loadLogin } from "./save";
import { isLoginExpired } from "../utils/time";
// {
//     "username": "saif",
//     "first_name": "saif",
//     "project": {
//       "name": "asdsad",
//       "logo": "/media/projects-logo/2111.w013.n001.577B.p30.577_ihxrxlP.jpg"
//     },
//     "is_active": true,
//     "role": "MANAGER",
//     "Authorization": ".." ,
//     "expire" : ""
//   }
export const authContext = createContext();

export function AuthContextProvider ({ children }) {
    const [login , setLogin] = useState(loadLogin())
    if (isLoginExpired(login?.expire)){
        localStorage.clear()
        setLogin(loadLogin())
    }
    // console.log( , "isLoginExpired")
    const [auth , setAuth] = useState(login);
    return <authContext.Provider value={{ auth , setAuth }}>
            {children}
           </authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);

};


