import { authContext , useAuth , AuthContextProvider  } from "./auth";
import { permissionContext , PermissionContextProvider , usePermission , MANAGER , SALES , CS } from "./permissions";

export default  AuthContextProvider ;

export {
    authContext , 
    useAuth , 
    permissionContext ,
    PermissionContextProvider ,
    usePermission ,
    MANAGER , 
    SALES , 
    CS ,
};
