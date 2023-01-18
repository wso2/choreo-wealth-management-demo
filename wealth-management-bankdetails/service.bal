import ballerina/http;
import ballerina/log;
import ballerinax/mssql;
import ballerinax/mssql.driver as _;
import ballerina/sql;


configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;
configurable int dbPort = ?;


mssql:Client mssql = check new (
host = dbHost,
user = dbUser,
password = dbPassword,
database = dbName,
port = dbPort
);


type AddedBanks record {
   string BankId;
   string Name;
   string Country;
   string CustomerID;
};

type EditBankResponse record {|
   boolean success;
|};

type LinkedBanks record {
   readonly string CustomerID;
   readonly string BankID;
};

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {


   # resource to return investment  account details.
   # + customerId - unique identifier for customer
   # + return - list of added banks of customer .
   resource function get addedBanks(string customerId = "001") returns AddedBanks[]|error {


       log:printInfo("retriveing bank details");

       sql:ParameterizedQuery selectLinkedBank = `SELECT banks.BankId, banks.Name, banks.Country, linkedbank.CustomerID  FROM banks INNER JOIN linkedbank ON (banks.BankId = linkedbank.BankID) WHERE linkedbank.CustomerID = ${customerId};`;

        stream<AddedBanks, sql:Error?> linkedBanksStream = mssql->query(selectLinkedBank);
        
        AddedBanks[] customerBanks = [];

        log:printInfo("Accessing data from DB");

        check from AddedBanks customerbank in linkedBanksStream
           do {
               AddedBanks customerBank = {CustomerID: customerbank.CustomerID, BankId: customerbank.BankId, Name: customerbank.Name, Country: customerbank.Country};
               customerBanks.push(customerBank);
           };

        return customerBanks;

    }


   # resource to add new bank for customer
   # + linkedBank - new bank added for customer
   # + return - LinekedBankResponse result of adding new bank to customer profile
   resource function post linkBank(@http:Payload LinkedBanks linkedBank) returns EditBankResponse|error {

    log:printInfo("Adding new bank for customer", customerID=linkedBank.CustomerID);

    sql:ParameterizedQuery addBank = `INSERT INTO linkedbank (CustomerID, BankID) VALUE (${linkedBank.CustomerID}, ${linkedBank.BankID})`;

    sql:ExecutionResult result = check mssql->execute(addBank);

    log:printInfo("Add new bank to DB");

    EditBankResponse addeBankResponse;

    if (result.affectedRowCount == 1) {
           addeBankResponse = {success: true};
    } else {
           addeBankResponse = {success: false};
    }

    return addeBankResponse;

    }


   #resource to removed the linked banks
   # + removedBank - new bank added for customer
   # + return - LinekedBankResponse result of adding new bank to customer profile
   resource function post linkinvestmentbank(@http:Payload LinkedBanks removedBank) returns EditBankResponse|error {

    log:printInfo("Adding new bank for customer", bankID=removedBank.BankID);

    sql:ParameterizedQuery deleteBank = `DELETE from linkedbank WHERE CustomerID = ${removedBank.CustomerID} AND BankID = ${removedBank.BankID}`;
      
    sql:ExecutionResult deleteResult = check mssql->execute(deleteBank);

    log:printInfo("Removed bank from DB");

    EditBankResponse removedBankResponse;

    if (deleteResult.affectedRowCount == 1) {
        removedBankResponse = {success: true};
    } else {
        removedBankResponse = {success: false};
    }
       return removedBankResponse;
   }
}
