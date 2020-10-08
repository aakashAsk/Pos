const express = require('express');
const userRouter = express.Router();
const User = require('../model/user.model');
var jwt = require('jsonwebtoken');

userRouter.post('/user/api/post', (req, res, next) => {
  const user = new User({
    name:req.body.name,
    email:req.body.email,
    number:req.body.number,
    code:req.body.code,
    password:req.body.password,
  });
  User.findOne({email: req.body.email}).then((result) => {
    if(typeof result === 'object' && result!== null){
      res.json({
        done:false,
        msg: 'email is already used'
      })
    }
    else{
      User.findOne({number: req.body.number}).then((result) => {
        if(typeof result === 'object' && result!== null){
          res.json({
            done:false,
            msg: 'mobile number is already used'
          })
        }
        else{
          User.findOne({code: req.body.code}).then((result) => {
            if(typeof result === 'object' && result!== null){
              let code;
              User.findOne().sort({_id: -1}).limit(1).then(id => {
                code = id.code.split('#');
                let acceptedCode = parseInt(code[1]) + 1;
                res.json({
                  done:false,
                  msg: 'code is already used next accepted id is #0' + acceptedCode,
                })
              });
            }
            else{
              user.save().then( (result) =>{
                console.log(result);
                let token = jwt.sign({email:result.email}, 'secret', {expiresIn: '12h'})
                res.status(200).json(
                  {
                    done:true,
                    token: token,
                    details: result
                  }
                );
              })
            }
          })
        }
      })
    }
  });
});

userRouter.get('/user/api/get/:email/:pass', (req, res) => {
  console.log(req.params)
  User.findOne({email: req.params.email, password: req.params.pass})
  .then((result) => {
    if(result !== null){
      let token = jwt.sign({email:result.email}, 'secret', {expiresIn: '12h'});
      res.status(200).json({
        done:true,
        key: token,
        details: result
      })
    }
    else{
      res.status(200).json({
        done:false
      })
    }
  })
})
module.exports = userRouter;