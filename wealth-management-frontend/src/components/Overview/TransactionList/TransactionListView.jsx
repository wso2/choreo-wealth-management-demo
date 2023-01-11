import React from 'react'
import { Accordion, Table, Image, Card } from "react-bootstrap";

export const TransactionListView = ({transactions}) => {

  transactions.reverse()
  const transactionDataConstant = loadTransactionsView(transactions);

  return (
    <Card className="transaction-list-container p-4" border="light">
      <h5 className="section-title mb-3">Recent Transactions</h5>
      <Accordion>
        <div className="transaction-list-card">
          {transactionDataConstant}
        </div>
      </Accordion>
    </Card>
  );
}

const loadTransactionsView = (transactions) => {

  return transactions.map((transaction,id)=>{
    const date = transaction.ValueDateTime.split("T")[0];

    return (
      <Accordion.Item eventKey={id} key={id}>
        <Accordion.Header className="transaction-list">
          <Image src={transaction.Logo} alt="logo" className="transaction-view-logo me-2" roundedCircle={true} height="24px"/>
          <div className="col">{date}</div>
          <div className="col">{transaction.TransactionReference}</div>
          <div className="col">{transaction.CreditDebitIndicator}</div>
          <div className="col">{transaction.Amount}</div>
        </Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover>
            <tbody>
            <tr>
              <td>Transaction Id</td>
              <td>{transaction.TransactionId}</td>
            </tr>
            <tr>
              <td>Account Id</td>
              <td>{transaction.AccountId}</td>
            </tr>
            <tr>
              <td>Transaction Information</td>
              <td>{transaction.TransactionInformation}</td>
            </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    )
  });
}
