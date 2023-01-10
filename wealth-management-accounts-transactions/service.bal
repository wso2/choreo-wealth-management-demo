import ballerina/http;
import ballerina/time;
import choreotestorganization/wealthmanagementtransactions;
import ballerina/log;

configurable string transactionServiceClientId = ?;
configurable string transactionServiceClientSecret = ?;

table<InvestmentAccount> key(CustomerID, AccountId) investmentAccount = table [
    {CustomerID: "001", AccountId: "15687012313258", AccountType: "Savings", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", "MaturityDate": "2025-04-16T06:06:06+00:00", Balance: "$3000.23", Name: "Alex Karter", SecondaryIdentification: "00021"},
    {CustomerID: "001", AccountId: "15687012313856", AccountType: "Current", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", "MaturityDate": "2025-04-16T06:06:06+00:00", Balance: "$6000.00", Name: "Alex Karter", SecondaryIdentification: "00021"}

];

type InvestmentAccount record {
    readonly string CustomerID;
    readonly string AccountId;
    string Status;
    string StatusUpdateDateTime;
    string Currency;
    string AccountType;
    string AccountSubType;
    string Nickname;
    string OpeningDate;
    string MaturityDate;
    string Balance;
    string Name;
    string SecondaryIdentification;
};

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A service to return transaction resource.
    # + accountId - accountID of the customer.
    # + return - Transaction resource.
    resource function get transactions(string accountId) returns wealthmanagementtransactions:Transaction[]|error {

        log:printInfo("retriveing transactions", accountId = accountId);

        wealthmanagementtransactions:Client transactionsService = check new (config = {
            auth: {
                clientId: transactionServiceClientId,
                clientSecret: transactionServiceClientSecret

            }
        }, serviceUrl="https://c112eada-316e-46a7-9705-df75e4a30edc-dev.e1-us-east-azure.choreoapis.dev/ywsm/wealthmanagementtransactions/1.0.0");
        wealthmanagementtransactions:Transaction[] getTransactionsResponse = check transactionsService->getTransactions(accountId);
        return getTransactionsResponse;
    }

    # A service to return investment  accounts details.
    # + customerId - unique identifier for customer
    # + return - InvestmentAccount resource.
    resource function get investmentaccounts(string customerId) returns InvestmentAccount[]|error {

        log:printInfo("Retriveing investment account details of customer", customerId = customerId);

        InvestmentAccount[] accountInfo = from var e in investmentAccount
            where e.CustomerID == customerId
            select e;

        return accountInfo;

    }

}

