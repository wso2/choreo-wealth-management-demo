import { Navigate } from "react-router-dom";
import { deleteBank } from "../../services/banks-service";
import { getTokenFromCookieOrRetrieve } from "../../services/utils";

export const Logout = () => {
    sessionStorage.clear();
    
    getTokenFromCookieOrRetrieve().then(access_token => {
        
        ["1", "2", "3"].forEach(bankId => {
            deleteBank(access_token, bankId)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
        })

        document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"); 
        });
    })

    return <Navigate to="/" replace={true} />
}