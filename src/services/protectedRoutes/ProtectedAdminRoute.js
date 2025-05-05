import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"

export const ProtectedAdminRoute = ({children}) => {
    const {currentUser} = useAuth();

    if(!currentUser){
        return <Navigate to="/login" replace/>;
    }

    return children ? children : <Outlet/>;
};