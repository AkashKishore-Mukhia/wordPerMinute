const express = require('express');
const userAuthModel = require('../Models/user-auth-model.js');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
  try{
    const {userName, email, password} = req.body;
    const user = await userAuthModel.findOne({ email: email });
    if(user != null)  return res.send({"massege": "user already exists"});

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userAuthModel({
      userName: userName,
      email: email,
      password: hashPassword
    });

    await newUser.save((err) => {
      console.log(err);
    });
    return res.send({"massege": "user created"});

  }catch{

  }
})

module.exports = router;