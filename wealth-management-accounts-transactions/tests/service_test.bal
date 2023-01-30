import ballerina/http;
import ballerina/test;




http:Client testClient = check new ("http://localhost:9090");


// Before Suite Function

@test:BeforeSuite
function beforeSuiteFunc() {

}


@test:Config {}
function testInvestmentAccounts(){
    InvestmentAccount[] | error response = testClient->get("/investmentaccounts?customerId=001");
    if response is error {
        test:assertFail(response.toString());
    }
    test:assertNotEquals(response.length(),0);
}


// After Suite Function

@test:AfterSuite
function afterSuiteFunc() {
}

