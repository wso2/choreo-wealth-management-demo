import React from 'react';
import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import ExpenseData from "../../../data/ExpenseData.json";
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
    <Card className="expenses-chart-container p-4" border="light">
      <h5 className="section-title mb-3">All Expenses</h5>
      {transactionHeaderConstant}
      <div className="p-2 text-center mb-2">Last Month</div>
      {transactionDataConstant}
    </Card>
  )
}

const loadTransactionsHeaderView = (transactionInfo) => {
  if (transactionInfo || user_access_token == null) {
    return (
      <div className="row chart-data-wrapper pb-3">
        <div className="col-4">
          <div className="chart-data-title">Daily</div>
          <div className="chart-data-value">{daily}</div>
        </div>
        <div className="col-4">
          <div className="chart-data-title">Weekly</div>
          <div className="chart-data-value">{weekly}</div>
        </div>
        <div className="col-4">
          <div className="chart-data-title">Monthly</div>
          <div className="chart-data-value">{monthly}</div>
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
    '#2366CC',
    '#23C2CC',
    '#272F82',
    '#5C7095',
    '#7B43C1',
    '#438CC1'
  ];

  if (transactionInfo || user_access_token == null) {
    return (
      <div className="row pie-chart-view">
        <div className="col-8">
          <PieChart width={200} height={200}>
            <Pie className="pie-stroke-color"  data={ExpenseData} dataKey="amount" outerRadius={75} label={renderCustomizedLabel}>
              {
                ExpenseData.map((entry, index) => <Cell key={index} fill={colorScheme[index % colorScheme.length]} />)
              }
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="col-4 d-flex align-items-center">
          <div>
            {
              ExpenseData.map((entry, index) =>
                <div key={index} className="expense-list-view">
                  <i className="bi bi-square-fill expense-list-icon"
                    style={{ color: colorScheme[index % colorScheme.length] }}>
                  </i>
                  <span> - </span>
                  {entry.name}
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
