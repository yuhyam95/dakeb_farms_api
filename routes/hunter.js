const express = require('express')
const router = express.Router()
const Hunter = require('../models/Hunter.js')


//GET HUNTERS
router.get('/', async (req, res) => {
    try{
       const getHunters = await Hunter.find().sort({createdAt: -1});
        res.json(getHunters)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW HUNTER
router.post("/", async (req, res) => {
  const { name, email, phonenumber, type, code } = req.body;
  const newHunter = new Hunter({ name, email, phonenumber, type, code });
   try{
     const savedHunter = await newHunter.save(); 
      res.json(savedHunter);
    }
    catch(err) {
        res.json({message: err})
    }
});


//GET SPECIFIC HUNTER
router.get('/:id', async (req, res) => {
  try{
    const getHunter = await Hunter.findOne({ _id: req.params.id });
    res.json(getHunter)
  }
  catch(err){
    res.json({message:err})
  }
});


//DELETE HUNTER
router.delete('/:id', async (req, res) =>{
  try{ 
    const removeHunter = await Hunter.deleteOne({_id: req.params.id})
    res.json(removeHunter)
  }
  catch(err){
      res.json({message:err})
  }
});


 //UPDATE HUNTERs
router.patch('/:id', async (req, res) =>{
  try{
    const updateHunter = await Hunter.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json(updateHunter)
  }
  catch(err){
    res.json({message:err})
  }
});

module.exports = router;