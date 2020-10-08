const express = require('express');
const productRouter = express.Router();
const Product = require('../model/Product.model');
const multer = require('multer');
const MINE_TYPE_MAP = {
  "image/jpeg": 'jpg',
  "image/png": "png",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error("invalid type");
    if(isValid){
      error = null;
    }
    cb(error, "backend/public/image")
  }, 
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const exe = MINE_TYPE_MAP[file.mimetype];
    cb(null, name + '_' + Date.now() + '.' + exe);
  }
})

productRouter.get('/api/product', (req, res)=>{
  Product.find().then((data) => {
    res.status(200).json({product:data});
  })
});

productRouter.post('/api/product', multer({storage: storage}).single('img'), (req, res)=>{
  const url = "http://localhost:3000/image/";
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    code: req.body.code,
    img: url + req.file.filename,
  })
  product.save().then((data)=>{
    res.status(200).json({product:data});
  })
});

productRouter.delete("/api/product/:id", (req, res)=>{
  Product.deleteOne({_id: req.params.id}).then(result=>{
    if(result.deletedCount === 1){
      res.status(200).json({
        message: 'product delete successfull'
      });
    }
    else{
      res.status(200).json({
        message: 'product is not delete'
      });
    }
  });
});

productRouter.put('/api/product/:id', multer({storage: storage}).single("img"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  const url = "http://localhost:3000/image/";
  let product;
  if(req.file !== undefined){
    product = {
      title: req.body.title,
      price: req.body.price,
      code: req.body.code,
      img: url + req.file.filename,
      id:req.body._id
    }
  }
  else{
    product = {
      title: req.body.title,
      price: req.body.price,
      code: req.body.code,
      img: req.body.img,
      id:req.body._id
    }
  }
  Product.updateOne({_id: req.params.id}, product).then((data) => {
    res.status(200).json({product:product});
  })
});

module.exports = productRouter;