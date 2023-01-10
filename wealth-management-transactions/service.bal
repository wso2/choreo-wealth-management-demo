import ballerina/http;

table<Transaction> key(TransactionId) AccountTransactions = table [
    {AccountId: "30080012343456", TransactionId: "12323", TransactionReference: "Food", CreditDebitIndicator: "Debit", BookingDateTime: "2022-04-05T10:43:07+00:00", ValueDateTime: "2022-09-05T10:45:22+00:00", TransactionInformation: "Restaurant Bill", Amount: "1230.00", Currency: "USD"},
    {AccountId: "15687012313256", TransactionId: "456231", TransactionReference: "Clothing", CreditDebitIndicator: "Debit", BookingDateTime: "2022-05-05T10:43:07+00:00", ValueDateTime: "2022-10-12T10:45:22+00:00", TransactionInformation: "Bill from the City Center", Amount: "200.00", Currency: "USD"},
    {AccountId: "15687012313258", TransactionId: "62723", TransactionReference: "Mortgage", CreditDebitIndicator: "Debit", BookingDateTime: "2017-04-05T10:43:07+00:00", ValueDateTime: "2022-11-05T10:45:22+00:00", TransactionInformation: "Medical checkup", Amount: "100.00", Currency: "USD"},
    {AccountId: "16687012313257", TransactionId: "80313", TransactionReference: "Bills", CreditDebitIndicator: "Debit", BookingDateTime: "2017-04-05T10:43:07+00:00", ValueDateTime: "2022-11-25T10:45:22+00:00", TransactionInformation: "Paid iCloud Subscription", Amount: "900.00", Currency: "USD"},
    {AccountId: "15687012313258", TransactionId: "80314", TransactionReference: "Transportation", CreditDebitIndicator: "Debit", BookingDateTime: "2017-04-05T10:43:07+00:00", ValueDateTime: "2022-11-25T10:45:22+00:00", TransactionInformation: "Paid iCloud Subscription", Amount: "100.00", Currency: "USD"},
    {AccountId: "15687012313856", TransactionId: "80315", TransactionReference: "Education", CreditDebitIndicator: "Debit", BookingDateTime: "2017-04-05T10:43:07+00:00", ValueDateTime: "2022-11-25T10:45:22+00:00", TransactionInformation: "Paid iCloud Subscription", Amount: "600.00", Currency: "USD"},
    {AccountId: "15687012313856", TransactionId: "80316", TransactionReference: "Shopping", CreditDebitIndicator: "Debit", BookingDateTime: "2017-04-05T10:43:07+00:00", ValueDateTime: "2022-11-25T10:45:22+00:00", TransactionInformation: "Paid iCloud Subscription", Amount: "300.00", Currency: "USD"}




];

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A resource for getting transaction information.
    #
    # + return - transaction information.
    resource function get transactions(string accountId) returns Transaction[]|error {

        Transaction[] transactions = from var e in AccountTransactions
            where e.AccountId == accountId
            select e;
        return transactions;
    }
}

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
