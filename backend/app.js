const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const productRouter = require('./router/product.router');
const cart = require('./router/cart.router');
const expense = require('./router/expense.router');
const userRouter = require('./router/user');

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
  next();
});

app.use(express.static("backend/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/cafePos').then(()=>{
  console.log("connect");
})
.catch((err) => {
  console.log(err);
});

app.use(productRouter);
app.use(cart);
app.use(expense);
app.use(userRouter);

module.exports = app;