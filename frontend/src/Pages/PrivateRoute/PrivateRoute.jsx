import { useAuth , usePermission} from '../../Hooks';
import React  from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
  const {auth} = useAuth();
  const {permission , setPermission} = usePermission();

  console.log(permission , "permission")
  return (
  <>
    { auth && permission.isAuthenticated ? (<Outlet/>) : (<Navigate to="/login" replace />)  }
  </>
  )
};

export default PrivateRoute;
