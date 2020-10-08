const mongoose = require('mongoose');

const Cart = mongoose.Schema({
  cart: [],
  date: {type: String, require: true},
  totalPrice: {type: Number, require: true},
  paymentType: {type: String, require: true},
  orderNo: {type: String, require: true},
});

module.exports = mongoose.model('Cart', Cart);