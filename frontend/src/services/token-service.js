import { CONFIG } from "../config";
import { getBasicAuthHeader } from "./utils";
import { post, get } from "./http-client";
import qs from 'qs';

export const getAppAccessToken = async () => {

    const requestConfig = {
        method: "POST",
        url: CONFIG.CHOREO_TOKEN_URL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": getBasicAuthHeader(CONFIG.CHOREO_APP_CONSUMER_KEY, CONFIG.CHOREO_APP_CONSUMER_SECRET)
        },
        data: qs.stringify({grant_type: 'client_credentials'})
    };

    return await post(requestConfig);
}

export const getUserAccessToken = async (code, app_access_token) => {

    const requestConfig = {
        method: "GET",
        url: CONFIG.CHOREO_URL_USER_ACCESS_TOKEN_API,
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + app_access_token
        },
        params: {
            "code": code,
            "clientId": CONFIG.ASGARDEO_APP_CONSUMER_KEY,
            "clinetSecret": CONFIG.ASGARDEO_APP_CONSUMER_SECRET,
            "redirectURI": CONFIG.ASGARDEO_REDIRECT_URL,
            "choreoKey": CONFIG.CHOREO_APP_CONSUMER_KEY,
            "choreoSecret": CONFIG.CHOREO_APP_CONSUMER_SECRET
        }
    };
    return await get(requestConfig);
}
