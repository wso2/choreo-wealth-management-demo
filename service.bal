import ballerina/http;

import ballerina/log;

configurable string accountServiceClientId = ?;
configurable string accountServiceClientSecret = ?;

type Amount record {
    string Amount;
    string Currency;
};

type ProprietaryBankTransactionCode record {
    string Code;
    string Issuer;
};

type Balance record {
    Amount Amount;
    string CreditDebitIndicator;
    string Type;
};

type TransactionItem record {
    string AccountId;
    string TransactionId;
    string TransactionReference;
    Amount Amount;
    string CreditDebitIndicator;
    string BookingDateTime;
    string ValueDateTime;
    string TransactionInformation;
    ProprietaryBankTransactionCode ProprietaryBankTransactionCode;
    Balance Balance;
};

type Data record {
    TransactionItem[] Transaction;
};

type Transactions record {
    Data Data;
};


type AccountDetailsItem record {
    string SchemeName;
    string Identification;
    string Name;
    string SecondaryIdentification;
};

type AccountItem record {
    string AccountId;
    string DisplayName;
    string Status;
    string StatusUpdateDateTime;
    string Currency;
    string AccountType;
    string AccountSubType;
    string Nickname;
    string OpeningDate;
    string MaturityDate;
    string Balance;
    AccountDetailsItem[] AccountDetails;
};

type AccountsData record {
    AccountItem[] Account;
};

type Accounts record {
    AccountsData Data;
};


# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A service to return accounts resource.
    # + customerId - accountID of the customer
    # + return - Account resource.
    resource function get accounts(string customerId) returns Accounts|error {
        log:printInfo("retriveing accounts", customerId = customerId);

        accountservice:Client accountserviceEp = check new (config = {
            auth: {
                clientId: accountServiceClientId,
                clientSecret: accountServiceClientSecret
            }
        });
        json getAccountsResponse = check accountserviceEp->getAccounts();
        return getAccountsResponse.cloneWithType(Accounts);
    }

    # A service to return transaction resource.
    # + customerId - accountID of the customer
    # + return - Transaction resource.
    resource function get transactions(string customerId) returns Transactions|error {
        log:printInfo("retriveing transactions", customerId = customerId);

        accountservice:Client accountserviceEp = check new (config = {
            auth: {
                clientId: accountServiceClientId,
                clientSecret: accountServiceClientSecret
            }
        });
        json getTransactionsResponse = check accountserviceEp->getTransactions();
        return getTransactionsResponse.cloneWithType(Transactions);
    }

    resource function get health() returns json {
        return {"status": "UP"};
    }

}

