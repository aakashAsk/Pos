const express = require('express');
const ExpenseRouter = express.Router();
const Expense = require('../model/expense.model');

ExpenseRouter.post('/expense/api/post', (req, res) => {
  const expense = new Expense({
    title: req.body.title,
    date: req.body.date,
    expenseList: req.body.expenseList
  });
  expense.save().then((result) => {
    res.status(200).json(result);
  });
});

ExpenseRouter.get('/expense/api/get', (req, res)=>{
  Expense.find().then((result)=>{
    console.log(result);
    res.status(200).json(result);
  })
})
module.exports = ExpenseRouter;