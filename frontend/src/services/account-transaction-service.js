import { CONFIG } from "../config";
import { post } from "./http-client";

export const getTransactions = async (user_access_token) => {
    
    const requestConfig = {
        method: "GET",
        url: CONFIG.CHOREO_URL_TRANSACTIONS_API,
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + user_access_token,
            "backendServiceClientID": CONFIG.CHOREO_ACCOUNT_SERVICE_CONSUMER_KEY,
            "backendServiceClientSecret": CONFIG.CHOREO_ACCOUNT_SERVICE_SECRET
        },
    };

    return await post(requestConfig);
}

export const getAccounts = async (user_access_token) => {

    const requestConfig = {
        method: "GET",
        url: CONFIG.CHOREO_URL_ACCOUNTS_API,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + user_access_token,
            "backendServiceClientID": CONFIG.CHOREO_ACCOUNT_SERVICE_CONSUMER_KEY,
            "backendServiceClientSecret": CONFIG.CHOREO_ACCOUNT_SERVICE_SECRET
        },
    };

    return await post(requestConfig);
}