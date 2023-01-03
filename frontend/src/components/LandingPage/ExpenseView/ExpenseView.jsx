import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import ExpenseData from "../../../data/ExpenseData.json";
import { ListGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { CONSTANTS } from '../../../services/utils';
import { getTransactions } from '../../../services/account-transaction-service';

var transactionInfo
var daily = '$123.40'
var weekly = '$423.20'
var monthly = '$1237.01'
var user_access_token = sessionStorage.getItem(CONSTANTS.user_access_token)

export const ExpenseView = () => {
  const [response, setResponse] = useState();

  useEffect(() => {
    if (user_access_token && transactionInfo == null) {
      getTransactions(user_access_token).then(data => {
        transactionInfo = data.data.Data
        setResponse(transactionInfo)
        daily = '$154.67'
        weekly = '$561.83'
        monthly = '$1797.00'

        transactionInfo.Transaction.map(transaction => {
          if (transaction.TransactionReference === "Food") {
            ExpenseData[0].amount = parseInt(transaction.Amount.Amount) + ExpenseData[0].amount
          } else if (transaction.TransactionReference === "Health") {
            ExpenseData[1].amount = parseInt(transaction.Amount.Amount) + ExpenseData[1].amount
          } else if (transaction.TransactionReference === "Clothing") {
            ExpenseData[2].amount = parseInt(transaction.Amount.Amount) + ExpenseData[2].amount
          } else if (transaction.TransactionReference === "Bills") {
            ExpenseData[3].amount = parseInt(transaction.Amount.Amount) + ExpenseData[3].amount
          } else {
            ExpenseData[4].amount = parseInt(transaction.Amount.Amount) + ExpenseData[4].amount
          }
        })
      })
    }
  }, [transactionInfo])

  var transactionHeaderConstant = loadTransactionsHeaderView(transactionInfo);
  var transactionDataConstant = loadTransactionsView(transactionInfo);

  return (
    <div className="transaction-list-container">
      <h5>All Expenses</h5>
      {transactionHeaderConstant}
      <div className="p-2 font-size-small font-color-orange">Last Month</div>
      {transactionDataConstant}
    </div>
  )
}

const loadTransactionsHeaderView = (transactionInfo) => {
  if (transactionInfo || user_access_token == null) {
    return (
      <div className="row">
        <div className="col-4">
          <div className="font-size-small font-color-orange">Daily</div>
          <div className="font-size-small font-color-dark">{daily}</div>
        </div>
        <div className="col-4">
          <div className="font-size-small font-color-orange">Weekly</div>
          <div className="font-size-small font-color-dark">{weekly}</div>
        </div>
        <div className="col-4">
          <div className="font-size-small font-color-orange">Monthly</div>
          <div className="font-size-small font-color-dark">{monthly}</div>
        </div>
      </div>
    )
  }
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
                                 cx,
                                 cy,
                                 midAngle,
                                 innerRadius,
                                 outerRadius,
                                 percent,
                               }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {/*{`${(percent * 100).toFixed(0)}%`}*/}
    </text>
  );
};

const loadTransactionsView = (transactionInfo) => {

  const colorScheme = [
    '#ffc808',
    '#ff7300',
    '#f0a87d',
    '#E79363',
    '#EEE10D',
    '#D9B991'
  ];

  if (transactionInfo || user_access_token == null) {
    return (
      <div className="pie-chart-view">
        <div className="col-8">
          <PieChart width={150} height={150}>
            <Pie className="pie-stroke-color"  data={ExpenseData} dataKey="amount" outerRadius={75} label={renderCustomizedLabel}>
              {
                ExpenseData.map((entry, index) => <Cell key={index} fill={colorScheme[index % colorScheme.length]} />)
              }
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="col-4">
          <ListGroup>
            {
              ExpenseData.map((entry, index) =>
                <ListGroup.Item key={index} className="expense-list-view font-size-small font-color-dark">
                  <i className="bi bi-square-fill expense-list-icon"
                    style={{ color: colorScheme[index % colorScheme.length] }}>
                  </i>
                  {entry.name}
                </ListGroup.Item>
              )
            }
          </ListGroup>
        </div>
      </div>
    )
  }
}
