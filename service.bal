import ballerina/http;


# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

        # A service to return accounts resource.
    # + backendServiceClientID - Client ID of the bank backend servie.
    # + backendServiceClientSecret - Client Secret of the bank backend servie.
    # + return - Account resource.
    resource function get accounts(@http:Header string backendServiceClientID, @http:Header string backendServiceClientSecret) returns json|error {
        if (!(backendServiceClientID is "" || backendServiceClientSecret is "")) {
            accountservice:Client accountserviceEp = check new (config = {
                auth: {
                    clientId: backendServiceClientID,
                    clientSecret: backendServiceClientSecret
                }
            });
            json getAccountsResponse = check accountserviceEp->getAccounts();
            return getAccountsResponse;
        } else {
            return error("client ID or client secret can not be empty!");
        }
    }
}
