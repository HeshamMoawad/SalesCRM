import { authContext , useAuth , AuthContextProvider  } from "./auth";
import { permissionContext , PermissionContextProvider , usePermission , MANAGER , SALES , CS } from "./permissions";
import { loadLogin , saveLogin , savePermission , loadPermission} from "./save";
import { useLogin } from "./login";
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
    loadLogin , 
    saveLogin ,
    savePermission , 
    loadPermission ,
    useLogin
};
