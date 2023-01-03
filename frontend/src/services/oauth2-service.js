import { CONFIG } from "../config";
import { useLocation, Navigate } from "react-router-dom";
import { getUserAccessToken } from "./token-service";
import { get } from "./http-client";
import { CONSTANTS } from "./utils";
import { RedirectResponse } from "../models/RedirectResponse";

export const Callback = () => {

    // read code from current url
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');

    const setResponseToSession = (redirectResponse) => {
        sessionStorage.setItem(CONSTANTS.redirect_response, JSON.stringify(redirectResponse));
    }

    // update app context 
    if (code) {
        console.log("extracted auth code from callback url");
        
        const app_access_token = sessionStorage.getItem(CONSTANTS.app_access_token);
        getUserAccessToken(code, app_access_token).then(tokenResponse => {
            // add user access token to session storage
            sessionStorage.setItem(CONSTANTS.user_access_token, tokenResponse.data.access_token);
            console.log("generated user access token");
            setResponseToSession(new RedirectResponse("SUCCESS !", "Successfully added the bank."));
        }).catch (error => {
            console.log("user access token generation failed", error);
            setResponseToSession(new RedirectResponse("ERROR !", "Access token generation failed."));
        });
    } else {
        console.log("cannot extract code from callback url: " + search);
        setResponseToSession(new RedirectResponse("ERROR !", "Invalid callback response."));
    }

    return <Navigate to="/banks" />
}

export const getAuthorizationURL = async (consent_id, app_access_token) => {
    
    const requestConfig = {
        method: "GET",
        url: CONFIG.CHOREO_URL_AUTHORIZATION_API,
        headers: {
            "Authorization": "Bearer " + app_access_token
        },
        params: {
            "client_id": CONFIG.ASGARDEO_APP_CONSUMER_KEY,
            "redirect_uri": CONFIG.ASGARDEO_REDIRECT_URL,
            "scope": "openid accounts transactions",
            "consentID": consent_id
        }
    };

    return await get(requestConfig);
}
