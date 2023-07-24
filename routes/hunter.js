const express = require('express')
const router = express.Router()
const Hunter = require('../models/Hunter.js')
const { isAuthenticated } = require('../middlewares/authMiddleWare.js')
const { checkPermissions } = require('../middlewares/checkPermissions.js');


//GET HUNTERS
router.get('/', isAuthenticated, checkPermissions('hunters'), async (req, res) => {
    try{
       const getHunters = await Hunter.find().sort({createdAt: -1});
        res.json(getHunters)
    }
    catch(err){
      res.status(404).json({message:err});
    }
});

//NEW HUNTER
router.post("/", isAuthenticated, checkPermissions('hunters'), async (req, res) => {
  const { name, email, phonenumber, type, code } = req.body;
  const newHunter = new Hunter({ name, email, phonenumber, type, code });
   try{
     const savedHunter = await newHunter.save(); 
      res.status(201).json(savedHunter);
    }
    catch(err) {
        res.status(404).json({message: err})
    }
});


//GET SPECIFIC HUNTER
router.get('/:id', isAuthenticated, checkPermissions('hunters'), async (req, res) => {
  try{
    const getHunter = await Hunter.findOne({ _id: req.params.id });
    res.json(getHunter)
  }
  catch(err){
    res.status(404).json({message:err})
  }
});


//DELETE HUNTER
router.delete('/:id', isAuthenticated, checkPermissions('hunters'), async (req, res) =>{
  try{ 
    const removeHunter = await Hunter.deleteOne({_id: req.params.id})
    res.json("Hunter Deleted")
  }
  catch(err){
      res.status(404).json({message:err})
  }
});


 //UPDATE HUNTERs
router.put('/:id', isAuthenticated, checkPermissions('hunters'), async (req, res) =>{
  try{
    const updateHunter = await Hunter.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Hunter Updated")
  }
  catch(err){
    res.status(404).json({message:err})
  }
});

module.exports = router;