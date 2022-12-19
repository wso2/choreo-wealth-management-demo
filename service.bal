import ballerina/http;
import choreotestorganization/accountservice;
import ballerina/log;



configurable string accountServiceClientId = ?;
configurable string accountServiceClientSecret = ?;

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A service to return accounts resource.
    # + backendServiceClientID - Client ID of the bank backend servie.
    # + backendServiceClientSecret - Client Secret of the bank backend servie.
    # + return - Account resource.
    resource function get accounts(string customerId) returns json|error {
        log:printInfo("retriveing accounts", customerId = customerId);
        
        if (!(backendServiceClientID is "" || backendServiceClientSecret is "")) {
            accountservice:Client accountserviceEp = check new (config = {
                auth: {
                    clientId: accountServiceClientId,
                    clientSecret: accountServiceClientSecret
                }
            });
            json getAccountsResponse = check accountserviceEp->getAccounts();
            return getAccountsResponse;
        } else {
            return error("client ID or client secret can not be empty!");
        }
    }

    # A service to return transaction resource.
    # + backendServiceClientID - Client ID of the bank backend servie.
    # + backendServiceClientSecret - Client Secret of the bank backend servie.
    # + return - Transaction resource.
    resource function get transactions(string customerId) returns json|error {
        log:printInfo("retriveing transactions", customerId = customerId);

        if (!(backendServiceClientID is "" || backendServiceClientSecret is "")) {
            accountservice:Client accountserviceEp = check new (config = {
                auth: {
                    clientId: accountServiceClientId,
                    clientSecret: accountServiceClientSecret
                }
            });
            json getTransactionsResponse = check accountserviceEp->getTransactions();
            return getTransactionsResponse;
        } else {
            return error("client ID or client secret can not be empty!");
        }
    }

    resource function get health() returns json {
        return { "status": "UP" };
    }


}
