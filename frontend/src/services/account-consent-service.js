import { CONFIG } from "../config";
import { AccountAccessConsent } from "../models/AccountAccessConsent";
import { post } from "./http-client";

export const generateAccountAccessConsent = async (app_access_token) => {
    
    const requestConfig = {
        method: "POST",
        url: CONFIG.CHOREO_URL_OPEN_BANKING_API,
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": "Bearer " + app_access_token,
            "consentServiceClientID": CONFIG.CHOREO_CONSENT_SERVICE_CONSUMER_KEY,
            "consentServiceClientSecret": CONFIG.CHOREO_CONSENT_SERVICE_SECRET
        },
        data: new AccountAccessConsent()
    };

    return await post(requestConfig);
}

