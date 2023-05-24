const mongoose = require('mongoose');

// const dataSchema = new mongoose.Schema({
//   wordPerMinute: Number,
//   accuracy: Number
// })

const userDataSchema = new mongoose.Schema({
  id: String,
  data: [], 
  best: Number
}, {collection: 'userData'})

const userDataModel = new mongoose.model('userData', userDataSchema);


module.exports = userDataModel;