import ballerina/http;
import ballerina/time;
import choreotestorganization/wealthmanagementtransactions;
import ballerina/log;
import choreotestorganization/wealthmanagementaccounts;

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

type AccountDetails record {|
    *wealthmanagementaccounts:AccountInformation;
    wealthmanagementtransactions:Transaction[] Transactions;
|};

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # Returns a list of transactions for a particular account.
    # + accountId - accountID of the customer.
    # + return - Transaction resource.
    resource function get transactions(string accountId) returns wealthmanagementtransactions:Transaction[]|error {

        log:printInfo("retriveing transactions", accountId = accountId);

        wealthmanagementtransactions:Client transactionsService = check new (config = {
            auth: {
                clientId: transactionServiceClientId,
                clientSecret: transactionServiceClientSecret

            }
        }, serviceUrl = "https://c112eada-316e-46a7-9705-df75e4a30edc-dev.e1-us-east-azure.choreoapis.dev/ywsm/wealthmanagementtransactions/1.0.0");
        wealthmanagementtransactions:Transaction[] getTransactionsResponse = check transactionsService->getTransactions(accountId);
        return getTransactionsResponse;
    }

    # return a list of investment accounts for a particular customer.
    # + customerId - unique identifier for customer
    # + return - InvestmentAccount resource.
    resource function get investmentaccounts(string customerId) returns InvestmentAccount[]|error {

        log:printInfo("Retriveing investment account details of customer", customerId = customerId);

        InvestmentAccount[] accountInfo = from var e in investmentAccount
            where e.CustomerID == customerId
            select e;

        return accountInfo;

    }

    # returns a list of accounts and transactions for a particular customer.
    # + customerId - unique customer identifier.
    # + bank - bank type.
    # + return - Transaction and Accounts resource.
    resource function get accountdetails(string customerId = "001", string bank = "Investment") returns AccountDetails[]|error {

        log:printInfo("retrieving account details for customer", customerId = customerId);

        AccountDetails[] accountAndTransactions = [];

        wealthmanagementaccounts:Client accountsService = check new (config = {
            auth: {
                clientId: transactionServiceClientId,
                clientSecret: transactionServiceClientSecret
            }
        }, serviceUrl = "https://c112eada-316e-46a7-9705-df75e4a30edc-prod.e1-us-east-azure.choreoapis.dev/ywsm/wealthmanagementaccounts/1.0.0");
        wealthmanagementaccounts:AccountInformation[] accountInformation = check accountsService->getAccounts(customerId, bank);

        foreach wealthmanagementaccounts:AccountInformation account in accountInformation {
            log:printInfo("retrieving transactions for bank", bank = bank);

            wealthmanagementtransactions:Client transactionsService = check new (config = {
                auth: {
                    clientId: transactionServiceClientId,
                    clientSecret: transactionServiceClientSecret

                }
            }, serviceUrl = "https://c112eada-316e-46a7-9705-df75e4a30edc-prod.e1-us-east-azure.choreoapis.dev/ywsm/wealthmanagementtransactions/1.0.0");
            wealthmanagementtransactions:Transaction[] transactions = check transactionsService->getTransactions(account.AccountId);
            AccountDetails accountInfo = transform(account, transactions);
            accountAndTransactions.push(accountInfo);
        }

        return accountAndTransactions;
    }
}

# combine a AccountInformation record and Transactions record to AccountDetails record to AccountDetails record.
# + accountInformation - AccountInformation record.
# + transactions - Transactions records.
# + return - AccountDetails record.
function transform(wealthmanagementaccounts:AccountInformation accountInformation, wealthmanagementtransactions:Transaction[] transactions) returns AccountDetails => {
    Bank: accountInformation.Bank,
    Transactions: transactions,
    AccountId: accountInformation.AccountId,
    Balance: accountInformation.Balance,
    AccountSubType: accountInformation.AccountSubType,
    AccountType: accountInformation.AccountType,
    Currency: accountInformation.Currency,
    CustomerID: accountInformation.CustomerID,
    MaturityDate: accountInformation.MaturityDate,
    Name: accountInformation.Name,
    Nickname: accountInformation.Nickname,
    OpeningDate: accountInformation.OpeningDate,
    SecondaryIdentification: accountInformation.SecondaryIdentification,
    Status: accountInformation.Status,
    StatusUpdateDateTime: accountInformation.StatusUpdateDateTime
};
