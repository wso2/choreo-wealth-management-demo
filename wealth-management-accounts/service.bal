import ballerina/http;
import ballerina/time;

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A resource for getting account information.
    #
    # + return - account information.
    resource function get accounts(string customerId) returns AccountList|error {

        table<AccountInformation> key(CustomerID) Accounts = table [
            { "CustomerID": "001","AccountId" : "30080012343456", "BankID" : "1", "AccountType": "Personal" , "Status": "Enabled" , "StatusUpdateDateTime": time:utcToString(time:utcNow()) , "Currency" : "USD" , "AccountSubType": "CurrentAccount" , "Nickname": "Bills", "OpeningDate" : "2020-12-16T06:06:06+00:00" , "MaturityDate": "2025-04-16T06:06:06+00:00" , "Balance": "$1975.23" , "Name": "Alex Karter", "SecondaryIdentification": "00021"},
            { "CustomerID": "002", "AccountId" : "15687012313256", "BankID" : "2" ,"AccountType": "Joint" , "Status": "Enabled" , "StatusUpdateDateTime": time:utcToString(time:utcNow()) , "Currency" : "USD" , "AccountSubType": "CurrentAccount" , "Nickname": "Bills", "OpeningDate" : "2020-12-16T06:06:06+00:00" , "MaturityDate": "2025-04-16T06:06:06+00:00" , "Balance": "$4567.23" , "Name": "Alex Karter", "SecondaryIdentification": "00021"}

        ];

        var accounts = table key(CustomerID) from var e in Accounts where e.CustomerID == customerId select e;
        return  accounts.cloneWithType(AccountList);

    }
}


type AccountInformation record {
    readonly string CustomerID;
    string AccountId;
    string BankID;
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

type AccountList record {
    AccountInformation[] Accounts;
};

