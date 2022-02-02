var express = require('express');
const req = require('express/lib/request');
const { ObjectId } = require('mongodb');
var router = express.Router();
const {dburl,mongodb,MongoClient}= require('../dbConfig')
/* GET users listing. */
router.get('/all',async(req, res)=>{
const client = await MongoClient.connect(dburl);
try {
  const db = await client.db('b26we');
  let document = await db.collection('users').find().toArray()

  res.json({
    message:"Data Fetched Successfully",
    data:document
  })
} catch (error) {
    console.log(error)
    res.json({
      message:"data fetching failed"
    })  
} finally{
  client.close()
}
});
router.post('/register',async(req, res)=>{
  const client = await MongoClient.connect(dburl);
  try {
    const db = await client.db('b26we');
    let user = await db.collection('users').findOne({email:req.body.email})
  if(user){
res.json({
  message:"the email already exist"
})
  }else{
     await db.collection('users').insertOne(req.body)
    res.json({
      message:"user Registered Successfully",
     
    })
  }
    
  } catch (error) {
      console.log(error)
      res.json({
        message:"Registration failed"
      })  
  } finally{
    client.close()
  }
  });


router.put('/edituser/:id',async(req,res)=>{
  const client = await MongoClient.connect(dburl);
try {
  const db = await client.db('b26we');
  let document = await db.collection('users').findOneAndReplace({_id:ObjectId(req.params.id)},req.body)
if(document.value){
  res.json({
    message:"Edited successfully",
    data:document.value
  })
}  else{
res.json({
  messsage:"ivalid ID",
  
})
  }
} catch (error) {
    console.log(error)
    res.json({
      message:"data fetching failed"
    })  
} finally{
  client.close()
}
})
router.delete('/deleteuser/:id',async(req,res)=>{
  const client = await MongoClient.connect(dburl);
try {
  const db = await client.db('b26we');
  let document = await db.collection('users').findOneAndDelete({_id:ObjectId(req.params.id)})
if(document){
  res.json({
    message:"Deleted successfully",
  })
}  else{
res.json({
  messsage:"ivalid ID"
  
})
  }
} catch (error) {
    console.log(error)
    res.json({
      message:"data fetching failed"
    })  
} finally{
  client.close()
}
})  
module.exports = router;
