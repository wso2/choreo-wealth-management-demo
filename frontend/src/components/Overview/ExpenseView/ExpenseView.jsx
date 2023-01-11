import React from 'react';
import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

var daily = '$123.40'
var weekly = '$423.20'
var monthly = '$1237.01'

export const ExpenseView = ({transactions}) => {
  const [expenseList, ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    populateExpenseData();
  })

  const populateExpenseData = async () => {
    
    setLoading(true);
    for await (let tran of transactions) {
      let expenseType = tran.TransactionReference;
      let amount = tran.Amount;

      let index = expenseList.findIndex((expense => expense.name === expenseType));
      if (index >= 0) {
        // updating expense amount
        let expense = expenseList[index];
        expenseList.splice(index, 1);

        expense.amount = parseInt(expense.amount) + parseInt(amount);
        expenseList.push(expense);
      } else {
        expenseList.push({"name": expenseType, "amount": parseInt(amount)});
      }

      if (transactions.indexOf(tran) === (transactions.length-1)) {
        setLoading(false);
      }
    }
  }

  var transactionHeaderConstant = loadTransactionsHeaderView();
  var transactionDataConstant = loadTransactionsView(expenseList);

  return (
    <Card className="expenses-chart-container p-4" border="light">
      <h5 className="section-title mb-3">All Expenses</h5>
      {transactionHeaderConstant}
      <div className="p-2 text-center mb-2">Last Month</div>
      {!loading && transactionDataConstant}
    </Card>
  )
}

const loadTransactionsHeaderView = () => {
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

const loadTransactionsView = (expenseList) => {

  const colorScheme = [
    '#2366CC',
    '#23C2CC',
    '#272F82',
    '#5C7095',
    '#7B43C1',
    '#438CC1'
  ];
  
  return (
    <div className="row pie-chart-view">
      <div className="col-8">
        <PieChart width={200} height={200}>
          <Pie className="pie-stroke-color"  data={expenseList} dataKey="amount" outerRadius={75} label={renderCustomizedLabel}>
            {
              expenseList.map((entry, index) => <Cell key={index} fill={colorScheme[index % colorScheme.length]} />)
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="col-4 d-flex align-items-center">
        <div>
          {
            expenseList.map((entry, index) =>
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
