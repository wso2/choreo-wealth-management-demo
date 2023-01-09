import { generateAccountAccessConsent } from "../../services/account-consent-service"
import { getAuthorizationURL } from "../../services/oauth2-service"
import { getAppAccessToken } from "../../services/token-service";
import { CONSTANTS } from "../../services/utils";
import { useState, useCallback } from "react";
import { Card, Image } from 'react-bootstrap';

export const BankCard = ({bank, setIsBankLoading, updateBankList}) => {

    // To catch async errors using ErrorBoundary
    const useAsyncError = () => {
        const [ , setError] = useState(null);
        return useCallback(e => {setError(() => {throw e})}, [setError]);
    };
    const throwError = useAsyncError();

    const handleBankAdd = async (event, bankId) => {
        
        event.preventDefault();
        if (setIsBankLoading) setIsBankLoading(true);
        
        // generate application access token
        let app_access_token = sessionStorage.getItem(CONSTANTS.app_access_token);
        try {
            if (!app_access_token) {

                const tokenResponse = await getAppAccessToken();
                app_access_token = tokenResponse.data.access_token;

                // add application access token to session storage
                sessionStorage.setItem(CONSTANTS.app_access_token, app_access_token);
                console.log("generated application access token");
            } else {
                console.log("found an application access token");
            }
        } catch (error) {
            console.log("error: " + error.message);
            if (setIsBankLoading) setIsBankLoading(false);
            throwError(new Error("failed to generate app access token"));
        }

        // generate consent id
        let consent_id;
        try {
            const consentResponse = await generateAccountAccessConsent(app_access_token);
            consent_id = consentResponse.data.Data.ConsentId;;
            console.log("generated new consent id: " + consent_id)
        } catch (error) {
            console.log("error: " + error.message);
            if (setIsBankLoading) setIsBankLoading(false);
            throwError(new Error("failed to generate consent ID"));
        }

        // generate authorization url
        try {
            const authorizeResponse = await getAuthorizationURL(consent_id, app_access_token)
            updateBankList(bankId);
            console.log("redirecting to ", authorizeResponse.data);
            window.location.replace(authorizeResponse.data);
        } catch (error) {
            console.log("error: " + error.message);
            if (setIsBankLoading) setIsBankLoading(false);
            throwError(new Error("failed to generate authorization url"));
        }
    }

    const handleBankDelete = (event, bankId) => {
        event.preventDefault();
        updateBankList(bankId);
    }

    /*
    This method will load add, edit, and delete icons
    Displays add icon if bank is not added
    Displays edit, delete icons if bank is already added
    */
    const loadBankFunctions = (bank) => {
        return bank.isAdded ? 
            (
                <div className="d-flex justify-content-between flex-row w-100">
                    <div className="list-inline-item">
                        <button
                            type="button"
                            className="btn bank-card-button button-primary"
                            onClick={e => handleBankDelete(e, bank.id)}
                        >
                            <i className="fi fi-rr-edit"/> Edit Bank
                        </button>
                    </div>
                    <div className="list-inline-item">
                        <button
                            type="button"
                            className="btn bank-card-button button-error"
                            onClick={e => handleBankDelete(e, bank.id)}
                        >
                            <i className="fi fi-rr-trash"/> Delete
                        </button>
                    </div>
                </div>
            ):
            (
                <div className="list-inline-item">
                    <button
                        type="button"
                        className="btn bank-card-button button-primary"
                        onClick={e => handleBankAdd(e, bank.id)}
                    >
                        <i className="fi fi-rr-add"/>Add Bank
                    </button>
                </div>
            );
    };

    return (
        <Card className="col p-4 mb-3 me-3 bank-card" id="bank-card" border="light">
            <Image src={bank.logo} width="40px" roundedCircle={true} />
            <div className="d-flex align-items-baseline flex-column my-3">
                <h5 className="bank-name mb-0">{bank.name}</h5>
                <span className="bank-location text-uppercase">{bank.country}</span>
            </div>
            <div className="d-flex bank-card-actions">
                {loadBankFunctions(bank)}
            </div>
        </Card>
    );
};
