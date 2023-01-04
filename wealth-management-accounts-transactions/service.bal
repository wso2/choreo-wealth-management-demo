import ballerina/http;
import choreotestorganization/accountservice;
import ballerina/log;

configurable string transactionServiceClientId = ?;
configurable string transactionServiceClientSecret = ?;

type TransactionList record {
    Transaction[] Transactions;
};

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
    resource function get transactions(string accountId) returns TransactionList|error {
        log:printInfo("retriveing transactions", accountId = accountId);

        accountservice:Client accountserviceEp = check new (config = {
            auth: {
                clientId: transactionServiceClientId,
                clientSecret: transactionServiceClientSecret
            }
        });
        json getTransactionsResponse = check accountserviceEp->getTransactions();
        return getTransactionsResponse.cloneWithType(TransactionList);
    }

}

