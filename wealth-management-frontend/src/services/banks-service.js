import { CONFIG } from "../config";
import { get, post } from "./http-client";

export const getAddedBanks = async (user_access_token) => {
    
    const requestConfig = {
        method: "GET",
        url: CONFIG.CHOREO_URL_BANKS_API + "/addedBanks?customerId=001",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + user_access_token,
        },
    };

    return await get(requestConfig);
}

export const addBank = async (user_access_token, bankId) => {

    const requestConfig = {
        method: "POST",
        url: CONFIG.CHOREO_URL_BANKS_API + "/linkBank",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + user_access_token
        },
        data: {
            "CustomerID": "001",
            "BankID": bankId
        }
    };

    return await post(requestConfig);
}

export const deleteBank = async (user_access_token, bankId) => {

    const requestConfig = {
        method: "POST",
        url: CONFIG.CHOREO_URL_BANKS_API + "/linkinvestmentbank",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + user_access_token
        },
        data: {
            "CustomerID": "001",
            "BankID": bankId
        }
    };

    return await post(requestConfig);
}