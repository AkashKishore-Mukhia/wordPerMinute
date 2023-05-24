const express = require('express');
const userAuthModel = require('../Models/user-auth-model');
const bcrypt = require('bcrypt');
const router = express.Router();
const path = require('path');

// express().set('view engine', 'ejs');
const app = express();
app.set('view engine', 'ejs');

router.post('/', async(req, res) => {
  try{
    const {email, password} = req.body;
    const user = await userAuthModel.findOne({email: email});

    if(user === null) return res.send({"user": "false", "wrongCredentials": "false", "res": {}});
    const isPassMatched = await bcrypt.compare(password, user.password);
    
    if(!isPassMatched) return res.send({"user": "true", "wrongCredentials": "true", "res": {}});

    res.send({"user": "true", "wrongCredentials": "false", "res": {id: user._id, email: user.email, username: user.userName }});
    // res.render('../views/pages/home');
  }catch(e) {
    console.error(e);
  }
})




module.exports = router;