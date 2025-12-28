import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/UserContext";

const RequireAuth = () => {
    const {user} = useAuth();
    console.log("user name is: ");
    console.log(user?.name);
    const location = useLocation();

    return (
        user?.name 
            ? <Outlet /> 
            : <Navigate to="/login" state={{from:{location}}} replace />
    );
}

export default RequireAuth;