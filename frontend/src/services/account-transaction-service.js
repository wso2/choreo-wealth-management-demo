import { CONFIG } from "../config";
import { get, post } from "./http-client";

export const getTransactions = async (user_access_token, accountId) => {
    
    const requestConfig = {
        method: "GET",
        url: CONFIG.CHOREO_URL_TRANSACTIONS_API + "?accountId=" + accountId,
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + user_access_token
        },
    };

    return await post(requestConfig);
}

export const getAccounts = async (user_access_token, bankName) => {

    const requestConfig = {
        method: "GET",
        url: CONFIG.CHOREO_URL_ACCOUNTS_API + "?customerId=001&bank=" + bankName,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + user_access_token
        },
    };

    return await get(requestConfig);
}

export const getInitialAccounts = async (user_access_token) => {
    const requestConfig = {
        method: "GET",
        url: CONFIG.CHOREO_URL_ACC_TRAN_API + "?customerId=001&bank=Investment",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + user_access_token
        },
    };

    return await get(requestConfig);
}