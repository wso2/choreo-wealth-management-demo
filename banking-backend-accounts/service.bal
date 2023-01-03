import ballerina/http;
import ballerina/time;

# A service representing a network-accessible API
# bound to port `9090`.
service / on new http:Listener(9090) {

    # A resource for getting account information.
    #
    # + return - account information.
    resource function get accounts(string customerId) returns Accounts|error {

        json accountResponse =
        {
            "Data": {
                "Account": [
                    {
                        "AccountId": "30080012343456",
                        "DisplayName": "Personal Accounts - Royal Crown Trust",
                        "Status": "Enabled",
                        "StatusUpdateDateTime": time:utcToString(time:utcNow()),
                        "Currency": "USD",
                        "AccountType": "Personal",
                        "AccountSubType": "CurrentAccount",
                        "Nickname": "Bills",
                        "OpeningDate": "2020-12-16T06:06:06+00:00",
                        "MaturityDate": "2025-04-16T06:06:06+00:00",
                        "Balance": "$1975.23",
                        "Account": [
                            {
                                "SchemeName": "SortCodeAccountNumber",
                                "Identification": "30080012343456",
                                "Name": "Alex Karter",
                                "SecondaryIdentification": "00021"
                            }
                        ]
                    },
                    {
                        "AccountId": "15687012313256",
                        "DisplayName": "Joint Account - Royal Crown Trust",
                        "Status": "Enabled",
                        "StatusUpdateDateTime": time:utcToString(time:utcNow()),
                        "Currency": "USD",
                        "AccountType": "Personal",
                        "AccountSubType": "CurrentAccount",
                        "Nickname": "Bills",
                        "OpeningDate": "2020-12-16T06:06:06+00:00",
                        "MaturityDate": "2025-04-16T06:06:06+00:00",
                        "Balance": "$4567.23",
                        "Account": [
                            {
                                "SchemeName": "SortCodeAccountNumber",
                                "Identification": "30080012343456",
                                "Name": "Alex Karter",
                                "SecondaryIdentification": "00021"
                            }
                        ]
                    }
                ]
            }
        };
        return accountResponse.cloneWithType(Accounts);
    }
}

type AccountDetailItem record {
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
    AccountDetailItem[] AccountDetail;
};

type Data record {
    AccountItem[] Account;
};

type Accounts record {
    Data Data;
};
