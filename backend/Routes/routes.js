const express = require('express')
const quoteModel = require('../Models/model')
const route = express.Router()


route.get('/quotes', async (req, res) => {
  try {
    const quote = await quoteModel.aggregate([{ $sample: { size: 1 } }])
    res.status(200).send({res: quote[0].quoteText})
  }catch(e) {
    
  }
})


route.get('/user', async(req, res) => {
  try{
    res.render('../views/pages/home', {});
  }catch(e) {
    console.error(e);
  }
})




module.exports = route