import ballerina/http;
import ballerina/log;

table<BankDetails> key(BankID) banks = table [
    {BankID: "1", Name: "Contoso Retail Bank", Country: "Wales"},
    {BankID: "2", Name: "Contoso SME Bank", Country: "Scotland"},
    {BankID: "3", Name: "Contoso Corporate Bank", Country: "England"},
    {BankID: "4", Name: "Contoso Investment Bank", Country: "Wales"}
];

table<LinkedBanks> key(CustomerID, BankID) linkedBanks = table [
    {CustomerID: "001", BankID: "4"}
];

type BankDetails record {
    readonly string BankID;
    string Name;
    string Country;
};

type LinkedBanks record {
    readonly string CustomerID;
    readonly string BankID;
};

type CustomerLinkedBanks record {
    string BankID;
    string Name;
    string Country;
    string CustomerID;
};

type LinekedBankResponse record {|
    boolean success;
|};

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A service to return investment  accounts details.
    # + customerId - unique identifier for customer
    # + return - addedBank details .
     resource function get addedBanks(string customerId="001") returns CustomerLinkedBanks[] {

        log:printInfo("retriveing bank details");

        BankDetails[] bankDetails = from var bank in banks
            select bank;

        LinkedBanks[] addedBanks = from var addedBank in linkedBanks
            where addedBank.CustomerID == customerId
            select addedBank;

        log:printInfo("Linked Banks ", banks=addedBanks.length());

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

    # A service to link newly added bank to customer profile.
    # + linkedBank - new bank added for customer
    # + return - LinekedBankResponse result of adding new bank to customer profile
    resource function post linkBank(@http:Payload LinkedBanks linkedBank) returns LinekedBankResponse {

        log:printInfo("linking new bank to customer");

        linkedBanks.add(linkedBank);

        LinkedBanks[] addedBanks = from var addedBank in linkedBanks
            where addedBank.BankID == linkedBank.BankID
            select addedBank;

        LinekedBankResponse result;
        if (addedBanks.length() != 0) {
            result = {success: true};
        } else {
            result = {success: false};
        }
        return result;
    }

    # A service to reset the linked banks
    # + removedBank - new bank added for customer
    # + return - LinekedBankResponse result of adding new bank to customer profile
    resource function post linkinvestmentbank(@http:Payload LinkedBanks removedBank) returns LinekedBankResponse {



        LinkedBanks removed = linkedBanks.remove([removedBank.CustomerID,removedBank.BankID]);
        
        log:printInfo("Removed bank " , bank = removedBank.BankID);

        LinekedBankResponse result;
        if (removed.CustomerID == removedBank.CustomerID && removed.BankID == removedBank.BankID) {
            result = {success: true};
        } else {
            result = {success: false};
        }
        return result;
    }
}
