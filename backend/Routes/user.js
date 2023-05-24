const express = require('express');
const userDataModel = require('../Models/user-data-model');
const router = express.Router();

router.post('/', async (req, res) => {
  const {wpm, acc, id} = req.body;
  
  const date = new Date().toISOString().slice(0, 10);
  const user = await userDataModel.findOne({id: id});
  
  if(user === null) {
    const newUser = new userDataModel({
      id: id,
      best: wpm
    });
    
    newUser.data.push({
      wordPerMinute: wpm,
      accuracy: acc,
      date: date
    })
    
    await newUser.save((err)=> {
      console.log(err);
    })
  }else{
    userDataModel.updateOne(
      { id: id }, // Query part
      { best: Math.max(user.best, wpm),
        $push: { data: {
        wordPerMinute: wpm,
        accuracy: acc,
        date: date
      }
      }}, // Update part
      function(err, result) {
      // Callback part
      if (err) {
        console.log(err);
      } else {
      // Do something with result
      }
    }
    );
  }
  res.send({msg: 'data saved'});

})

router.post('/data', async (req, res) => {
  const {id} =  req.body;
  res.send(await userDataModel.findOne({id: id}));
})


module.exports = router;