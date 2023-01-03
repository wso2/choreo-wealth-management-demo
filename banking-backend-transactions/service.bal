import ballerina/http;

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A resource for getting transaction information.
    #
    # + return - transaction information.
    resource function get transactions(string accountId) returns Transactions|error {

        json transactionResponse =
        {
            "Data": {
                "Transaction": [
                    {
                        "AccountId": "12345678",
                        "TransactionId": "12323",
                        "TransactionReference": "Food",
                        "Amount": {
                            "Amount": "900.00",
                            "Currency": "USD"
                        },
                        "CreditDebitIndicator": "Debit",
                        "BookingDateTime": "2022-04-05T10:43:07+00:00",
                        "ValueDateTime": "2022-09-05T10:45:22+00:00",
                        "TransactionInformation": "Restaurant Bill",
                        "ProprietaryBankTransactionCode": {
                            "Code": "Transfer",
                            "Issuer": "RoyalCrownTrust"
                        },
                        "Balance": {
                            "Amount": {
                                "Amount": "1230.00",
                                "Currency": "USD"
                            },
                            "CreditDebitIndicator": "Debit",
                            "Type": "InterimBooked"
                        }
                    },
                    {
                        "AccountId": "10335678",
                        "TransactionId": "456231",
                        "TransactionReference": "Clothing",
                        "Amount": {
                            "Amount": "200.00",
                            "Currency": "USD"
                        },
                        "CreditDebitIndicator": "Debit",
                        "BookingDateTime": "2022-05-05T10:43:07+00:00",
                        "ValueDateTime": "2022-10-12T10:45:22+00:00",
                        "TransactionInformation": "Bill from the City Center",
                        "ProprietaryBankTransactionCode": {
                            "Code": "Transfer",
                            "Issuer": "RoyalCrownTrust"
                        },
                        "Balance": {
                            "Amount": {
                                "Amount": "1030.00",
                                "Currency": "USD"
                            },
                            "CreditDebitIndicator": "Debit",
                            "Type": "InterimBooked"
                        }
                    },
                    {
                        "AccountId": "10335678",
                        "TransactionId": "62723",
                        "TransactionReference": "Health",
                        "Amount": {
                            "Amount": "100.00",
                            "Currency": "USD"
                        },
                        "CreditDebitIndicator": "Debit",
                        "BookingDateTime": "2017-04-05T10:43:07+00:00",
                        "ValueDateTime": "2022-11-05T10:45:22+00:00",
                        "TransactionInformation": "Medical checkup",
                        "ProprietaryBankTransactionCode": {
                            "Code": "Transfer",
                            "Issuer": "RoyalCrownTrust"
                        },
                        "Balance": {
                            "Amount": {
                                "Amount": "900.00",
                                "Currency": "USD"
                            },
                            "CreditDebitIndicator": "Debit",
                            "Type": "InterimBooked"
                        }
                    },
                    {
                        "AccountId": "10335678",
                        "TransactionId": "80313",
                        "TransactionReference": "Bills",
                        "Amount": {
                            "Amount": "90.00",
                            "Currency": "USD"
                        },
                        "CreditDebitIndicator": "Debit",
                        "BookingDateTime": "2017-04-05T10:43:07+00:00",
                        "ValueDateTime": "2022-11-25T10:45:22+00:00",
                        "TransactionInformation": "Paid iCloud Subscription",
                        "ProprietaryBankTransactionCode": {
                            "Code": "Transfer",
                            "Issuer": "RoyalCrownTrust"
                        },
                        "Balance": {
                            "Amount": {
                                "Amount": "900.00",
                                "Currency": "USD"
                            },
                            "CreditDebitIndicator": "Debit",
                            "Type": "InterimBooked"
                        }
                    }
                ]
            }
        };
        return transactionResponse.cloneWithType(Transactions);

    }
}
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
