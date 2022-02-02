var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const {email,student} = require('../Schema');
const {dbUrl} = require('../dbConfig');

mongoose.connect(dbUrl)

router.get('/', async(req, res)=>{
 const emails =await email.find()
 res.send(emails)

});
router.post('/email',async(req,res)=>{
  try {
    const Email = await email.create(req.body)
    res.send(Email)
  } catch (error) {
    res.json({message:error._message})
  }
})

module.exports = router;
