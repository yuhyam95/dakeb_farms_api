const express = require('express');
const router = express.Router();
const User = require('../models/User.js')

//GET USERS
router.get('/', async (req, res) => {
    try{
       const getUsers = await User.find().sort({createdAt: -1});
        res.json(getUsers)
    }
    catch(err){
      res.status(404).json({message:err});
    }
});

// CREATE A NEW USER
router.post('/', async (req, res) => {
  try {
    const { name, email, salary, phonenumber, departmentId, positionId, roleId, usertype, password } = req.body;

    const user = new User({
      name,
      email, 
      salary, 
      phonenumber,
      department: departmentId,
      position: positionId,
      role: roleId,
      usertype,
      password
    });

    await user.save();
    res.send('User created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

//GET SPECIFIC USER
router.get('/:id', async (req, res) => {
    try{
      const getUser = await User.findOne({ _id: req.params.id });
      res.json(getUser)
    }
    catch(err){
      res.status(404).json("Error getting user")
    }
  });
  
  
  //DELETE USER
  router.delete('/:id', async (req, res) =>{
    try{ 
      const removeUser = await User.deleteOne({_id: req.params.id})
      res.json("User Deleted")
    }
    catch(err){
        res.status(404).json('Error deleting user')
    }
  });
  
  
   //UPDATE USER
  router.put('/:id', async (req, res) =>{
    try{
      const updateUser = await User.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json("User Updated")
    }
    catch(err){
      res.status(404).json("Error updating user")
    }
  });
  
module.exports = router;
