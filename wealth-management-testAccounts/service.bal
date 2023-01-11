import ballerina/http;
import ballerina/log;
import choreotestorganization/wealthmanagementaccounts;
import choreotestorganization/wealthmanagementtransactions;


configurable string transactionServiceClientId = ?;
configurable string transactionServiceClientSecret = ?;

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
 
type AccountDetails record {|
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
   wealthmanagementtransactions:Transaction[] Transactions;
|};


# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

   # A service to return accounts and transaction information for a particular bank.
   # + customerId - unique customer identifier.
   # + bank - bank type.
   # + return - Transaction and Accounts resource.
   resource function get acountdetails(string customerId, string bank) returns AccountDetails[]|error {
 
       log:printInfo("retrieving account details for customer", customerId = customerId);
 
       AccountDetails[] accountAndTransactions = [];
 
       wealthmanagementaccounts:Client accountsService = check new (config = {
           auth: {
               clientId: transactionServiceClientId,
               clientSecret: transactionServiceClientSecret
           }
       }, serviceUrl = "https://c112eada-316e-46a7-9705-df75e4a30edc-prod.e1-us-east-azure.choreoapis.dev/ywsm/wealthmanagementaccounts/1.0.0");
       wealthmanagementaccounts:AccountInformation[] accountsResponse = check accountsService->getAccounts(customerId, bank);
 
       foreach wealthmanagementaccounts:AccountInformation account in accountsResponse {
           log:printInfo("retrieving transactions for bank", bank = bank);
 
           wealthmanagementtransactions:Client transactionsService = check new (config = {
               auth: {
                   clientId: transactionServiceClientId,
                   clientSecret: transactionServiceClientSecret
 
               }
           }, serviceUrl = "https://c112eada-316e-46a7-9705-df75e4a30edc-prod.e1-us-east-azure.choreoapis.dev/ywsm/wealthmanagementtransactions/1.0.0");
           wealthmanagementtransactions:Transaction[] getTransactionsResponse = check transactionsService->getTransactions(account.AccountId);
 
           AccountDetails accountInfo = {CustomerID: accountsResponse[0].CustomerID, AccountId: accountsResponse[0].AccountId , Bank: accountsResponse[0].Bank,
           Status: accountsResponse[0].Status , StatusUpdateDateTime: accountsResponse[0].StatusUpdateDateTime , Currency: accountsResponse[0].Currency , AccountType: accountsResponse[0].AccountType ,
           AccountSubType: accountsResponse[0].AccountSubType , Nickname: accountsResponse[0].Nickname, OpeningDate: accountsResponse[0].OpeningDate ,
           MaturityDate: accountsResponse[0].MaturityDate, Balance: accountsResponse[0].Balance , Name: accountsResponse[0].Name,
           SecondaryIdentification: accountsResponse[0].SecondaryIdentification , Transactions: getTransactionsResponse};
 
           accountAndTransactions.push(accountInfo);
       }
 
       return accountAndTransactions;
 
   }

}
