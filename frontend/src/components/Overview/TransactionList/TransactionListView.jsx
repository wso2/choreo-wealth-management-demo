import React from 'react'
import { Accordion, Table, Image, Card } from "react-bootstrap";
import TransactionData from "../../../data/TransactionData.json";
import { SkeletonTransaction } from './SkeletonTransaction';
import { useState, useEffect } from "react";
import { getTransactions } from '../../../services/account-transaction-service';
import { CONSTANTS, loadBankLogoByNickName } from '../../../services/utils';

export const TransactionListView = () => {
  
  const [transactions, setTransactions] = useState(TransactionData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // get user access token to session storage
    const user_access_token = sessionStorage.getItem(CONSTANTS.user_access_token);
    if (user_access_token) {
      setLoading(true);

      getTransactions(user_access_token).then(resp => {
        resp.data.Data.Transaction.map(transaction => {
          transactions.push(transaction)
        })
        setLoading(false);
      }).catch(err => console.log(err));
    }
  }, [transactions])

  transactions.reverse()
  const transactionDataConstant = loadTransactionsView(transactions);

  return (
    <Card className="transaction-list-container p-4" border="light">
      <h5 className="section-title mb-3">Recent Transactions</h5>
      <Accordion>
        <div className="transaction-list-card">
          {transactionDataConstant}
          {loading && loadTransactionsSkeletons(transactions)}
        </div>
      </Accordion>
    </Card>
  );
}

const loadTransactionsSkeletons = (transactions) => {
  return transactions.map((transaction, index) => {
    return <SkeletonTransaction key={index}/>
  })
}

const loadTransactionsView = (transactions) => {

  return transactions.map((transaction,id)=>{
    const date = transaction.ValueDateTime.split("T")[0];
    const logoPath = loadBankLogoByNickName(transaction.ProprietaryBankTransactionCode.Code);

    return (
      <Accordion.Item eventKey={id} key={id}>
        <Accordion.Header className="transaction-list">
          <Image src={logoPath} alt="logo" className="transaction-view-logo me-2" roundedCircle={true} height="36px"/>
          <div className="col">{date}</div>
          <div className="col">{transaction.TransactionReference}</div>
          <div className="col">{transaction.CreditDebitIndicator}</div>
          <div className="col">{transaction.Amount.Currency} {transaction.Amount.Amount}</div>
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
