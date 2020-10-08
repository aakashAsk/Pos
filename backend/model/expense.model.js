const mongoose = require('mongoose');

const Expense = mongoose.Schema({
  title: {type: String, require:true},
  date: {type: String, require:true},
  expenseList: []
});

module.exports = mongoose.model('Expense', Expense);