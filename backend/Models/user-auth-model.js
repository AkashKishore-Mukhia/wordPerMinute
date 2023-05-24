const mongoose = require('mongoose');


const userAuthSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String
}, {collection: 'userAuthData'});

const userAuthModel = new mongoose.model('userAuthData', userAuthSchema);


module.exports = userAuthModel;