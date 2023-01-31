import ballerina/http;
import ballerina/time;

table<AccountInformation> key(CustomerID, AccountId) accounts = table [
    {CustomerID: "001", AccountId: "30080012343456", Bank: "Insurance", AccountType: "Savings", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", MaturityDate: "2025-04-16T06:06:06+00:00", Balance: "$1975.23", Name: "Alex Karter", SecondaryIdentification: "00021"},
    {CustomerID: "001", AccountId: "15687012313256", Bank: "Asset Management", AccountType: "Joint", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", "MaturityDate": "2025-04-16T06:06:06+00:00", Balance: "$4567.23", Name: "Alex Karter", SecondaryIdentification: "00021"},
    {CustomerID: "001", AccountId: "15687012313258", Bank: "Personal", AccountType: "Savings", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", "MaturityDate": "2025-04-16T06:06:06+00:00", Balance: "$3000.23", Name: "Alex Karter", SecondaryIdentification: "00021"},
    {CustomerID: "001", AccountId: "15687012313856", Bank: "Personal", AccountType: "Current", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", "MaturityDate": "2025-04-16T06:06:06+00:00", Balance: "$5000.00", Name: "Alex Karter", SecondaryIdentification: "00021"},
    {CustomerID: "001", AccountId: "16687012313257", Bank: "Securities", AccountType: "Personal", Status: "Enabled", StatusUpdateDateTime: time:utcToString(time:utcNow()), Currency: "USD", AccountSubType: "CurrentAccount", Nickname: "Bills", OpeningDate: "2020-12-16T06:06:06+00:00", "MaturityDate": "2025-04-16T06:06:06+00:00", Balance: "$5000.23", Name: "Alex Karter", SecondaryIdentification: "00021"}

];

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A resource for getting account information.
    #
    # + return - account information.
    resource function get accounts(string customerId = "001", string bank = "Investment") returns AccountInformation[]|error {
        

        AccountInformation[] accountInfo = from var e in accounts
            where e.CustomerID == customerId
            where e.Bank == bank
            select e;

        return accountInfo;

    }
}

type AccountInformation record {
    readonly string CustomerID;
    readonly string AccountId;
    string Bank;
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

