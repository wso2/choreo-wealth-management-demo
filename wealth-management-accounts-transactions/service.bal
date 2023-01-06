import ballerina/http;
import choreotestorganization/wealthmanagementtransactions;
import ballerina/log;


configurable string transactionServiceClientId = ?;
configurable string transactionServiceClientSecret = ?;


type Transaction record {
    string AccountId;
    readonly string TransactionId;
    string TransactionReference;
    string CreditDebitIndicator;
    string BookingDateTime;
    string ValueDateTime;
    string TransactionInformation;
    string Amount;
    string Currency;
   
};

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A service to return transaction resource.
    # + accountId - accountID of the customer
    # + return - Transaction resource.
    resource function get transactions(string accountId) returns wealthmanagementtransactions:Transaction[]|error {
        log:printInfo("retriveing transactions", accountId = accountId);

        wealthmanagementtransactions:Client transactionsService = check new (config = {
            auth: {
                clientId: transactionServiceClientId,
                clientSecret: transactionServiceClientSecret
            }
        });
        wealthmanagementtransactions:Transaction[] getTransactionsResponse = check transactionsService->getTransactions(accountId);
        return getTransactionsResponse;
    }

}

