import ballerina/http;
import ballerina/time;
import choreotestorganization/wealthmanagementtransactions;
import ballerina/log;

configurable string transactionServiceClientId = ?;
configurable string transactionServiceClientSecret = ?;

table<InvestmentAccount> key(CustomerID, AccountId) investmentAccount = table [
    {CustomerID: "001", AccountId: "15687012313258", AccountType: "Savings", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", "MaturityDate": "2025-04-16T06:06:06+00:00", Balance: "$3000.23", Name: "Alex Karter", SecondaryIdentification: "00021"},
    {CustomerID: "001", AccountId: "15687012313856", AccountType: "Current", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", "MaturityDate": "2025-04-16T06:06:06+00:00", Balance: "$5000.00", Name: "Alex Karter", SecondaryIdentification: "00021"}

];

table<BankDetails> key(BankID) banks = table [
    {BankID: "1", Name: "Contoso Retail Bank", Country: "Wales"},
    {BankID: "2", Name: "Contoso SME Bank", Country: "Scotland"},
    {BankID: "3", Name: "Contoso Corporate Bank", Country: "England"},
    {BankID: "4", Name: "Contoso Investment Bank", Country: "Wales"}
];

table<LinkedBanks> key(CustomerID) linkedBanks = table [
    {CustomerID: "001", BankID: "4"}
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

type BankDetails record {
    readonly string BankID;
    string Name;
    string Country;
};

type LinkedBanks record {
    readonly string CustomerID;
    string BankID;
};

type CustomerLinkedBanks record {
    string BankID;
    string Name;
    string Country;
    string CustomerID;
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

    # A service to return investment  accounts details.
    # + customerId - unique identifier for customer
    # + return - InvestmentAccount resource.
    resource function get investmentaccounts(string customerId) returns InvestmentAccount[]|error {

        log:printInfo("retriveing investment account details of customer", customerId = customerId);

        InvestmentAccount[] accountInfo = from var e in investmentAccount
            where e.CustomerID == customerId
            select e;

        return accountInfo;

    }

    # A service to return investment  accounts details.
    # + customerId - unique identifier for customer
    # + return - addedBank details .
    resource function get addedBanks(string customerId) returns CustomerLinkedBanks[] {

        log:printInfo("retriveing bank details");

        BankDetails[] bankDetails = from var bank in banks
            select bank;

        LinkedBanks[] addedBanks = from var addedBank in linkedBanks
            where addedBank.CustomerID == customerId
            select addedBank;

        CustomerLinkedBanks[] customerBanks = [];
        foreach BankDetails bank in bankDetails {
            foreach LinkedBanks linkedBank in addedBanks {
                if (bank.BankID == linkedBank.BankID) {
                    CustomerLinkedBanks customerBank = {CustomerID: linkedBank.CustomerID, BankID: bank.BankID, Name: bank.Name, Country: bank.Country};
                    customerBanks.push(customerBank);
                }
            }

        }
        return customerBanks;
    }

}

