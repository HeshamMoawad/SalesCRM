import React, { useContext, createContext , useState } from "react";
import { loadLogin } from "./save";
// {
//     "username": "saif",
//     "first_name": "saif",
//     "project": {
//       "name": "asdsad",
//       "logo": "/media/projects-logo/2111.w013.n001.577B.p30.577_ihxrxlP.jpg"
//     },
//     "is_active": true,
//     "role": "MANAGER",
//     "Authorization": ".."
//   }

export const authContext = createContext();

export function AuthContextProvider ({ children }) {
    const [auth , setAuth] = useState(loadLogin());
    return <authContext.Provider value={{ auth , setAuth }}>
            {children}
           </authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);

};


