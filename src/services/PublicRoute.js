import { Outlet, Navigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";


export const PublicRoute = () => {
    const { isAuthenticated, currentUser } = useAuth();

    if(!isAuthenticated)
    {
        const defaultPath = currentUser.role === 'admin' ? '/dashboard/home' : '/user/dashboard';
        return <Navigate to={defaultPath} replace/>;
    }
    return <Outlet/>
}