const express = require('express');
const CartRouter = express.Router();
const Cart = require('../model/cart.model');
let orderno;

CartRouter.get('*', (req, res, next)=>{
  Cart.find().sort({_id: -1}).limit(1).then((data) => {
    if(data.length === 0){
      orderno = 0;
    }
    else{
      orderno = parseInt(data[0].orderNo);
    }
    next();
  });
});

CartRouter.post("/cart/api/post", (req, res) => {
  const cart = new Cart({
    cart: req.body.cart,
    date:req.body.date,
    totalPrice:req.body.totalPrice,
    paymentType:req.body.paymentType,
    orderNo: orderno + 1,
  });
  cart.save().then((data) => {
    orderno +=1;
    res.status(200).json({orderNo:data.orderNo})
  });
});

CartRouter.get("/cart/api/get/orderno", (req, res)=>{
  res.status(200).json({orderNo:orderno});
})

module.exports = CartRouter;