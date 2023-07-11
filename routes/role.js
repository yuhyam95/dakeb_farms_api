const express = require('express')
const router = express.Router()
const Role = require('../models/Role.js')


//GET ROLES
router.get('/', async (req, res) => {
    try{
       const getRoles = await Role.find().sort({createdAt: -1});
        res.json(getRoles)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW ROLE
router.post("/", async (req, res) => {
  const { name } = req.body;
  const newRole = new Role({ name });
   try{
     const savedRole = await newRole.save(); 
      res.json(savedRole);
    }
    catch(err) {
        res.json({message: err})
    }
});


//GET SPECIFIC ROLE
router.get('/:id', async (req, res) => {
  try{
    const getRole = await Role.findOne({ _id: req.params.id });
    res.json(getRole)
  }
  catch(err){
    res.json({message:err})
  }
});


//DELETE ROLE
router.delete('/:id', async (req, res) =>{
  try{ 
    const removeRole = await Role.deleteOne({_id: req.params.id})
    res.json(removeRole)
  }
  catch(err){
      res.json({message:err})
  }
});


 //UPDATE ROLE
router.patch('/:id', async (req, res) =>{
  try{
    const updateRole = await Role.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json(updateRole)
  }
  catch(err){
    res.json({message:err})
  }
});

module.exports = router;