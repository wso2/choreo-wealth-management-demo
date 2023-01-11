import ballerina/http;
import ballerina/time;


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

# A service for retrieving account details for investment bank accounts
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A resource for returning account details
    # + customerId - unique identifier for customer
    # + return - InvestmentAccount
    resource function get accounts(string customerId="001") returns InvestmentAccount[]|error {
        // Send a response back to the caller.
       InvestmentAccount[] accountInfo = from var e in investmentAccount
            where e.CustomerID == customerId
            select e;
       return accountInfo;
    }
}
