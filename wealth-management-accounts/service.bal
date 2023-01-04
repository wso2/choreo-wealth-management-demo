import ballerina/http;
import ballerina/time;
import ballerina/io;

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A resource for getting account information.
    #
    # + return - account information.
    resource function get accounts(string customerId, string bankId, string accountType) returns AccountInformation[]|error {

        table<AccountInformation> key(CustomerID) accounts = table [
            {CustomerID: "001", AccountId: "30080012343456", BankID: "1", AccountType: "Personal", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", MaturityDate: "2025-04-16T06:06:06+00:00", Balance: "$1975.23", Name: "Alex Karter", SecondaryIdentification: "00021"},
            {CustomerID: "002", AccountId: "15687012313256", BankID: "2", AccountType: "Joint", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", "MaturityDate": "2025-04-16T06:06:06+00:00", Balance: "$4567.23", Name: "Alex Karter", SecondaryIdentification: "00021"}

        ];

        AccountInformation[] accountInfo = from var e in accounts
            where e.CustomerID == customerId
            where e.BankID == bankId
            where e.AccountType == accountType
            select e;
        io:println(accounts);
        return accountInfo;

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

