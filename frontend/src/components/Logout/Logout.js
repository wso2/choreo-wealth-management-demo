import { Navigate } from "react-router-dom";

export const Logout = () => {
    sessionStorage.clear();
    return <Navigate to="/" replace={true} />
}