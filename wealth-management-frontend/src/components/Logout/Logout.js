import { Navigate } from "react-router-dom";
import { deleteBank } from "../../services/banks-service";
import { getTokenFromCookieOrRetrieve } from "../../services/utils";

export const Logout = () => {
    sessionStorage.clear();
    getTokenFromCookieOrRetrieve().then(access_token => {
        ["1", "2", "3"].forEach(bankId => {
            deleteBank(access_token, bankId)
                .then(resp => console.log(resp))
                .catch(err => console.log(err));
        })
    })

    return <Navigate to="/" replace={true} />
}