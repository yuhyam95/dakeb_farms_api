const express = require('express')
const router = express.Router()
const Permission = require('../models/Permission.js')
const { isAuthenticated } = require('../middlewares/authMiddleWare.js')
const { checkPermissions } = require('../middlewares/checkPermissions.js');


//GET PERMISSIONS
router.get('/', isAuthenticated, checkPermissions('permissions'), async (req, res) => {
    try{
       const getPermissions = await Permission.find().sort({createdAt: -1});
        res.json(getPermissions)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW PERMISSION
router.post("/", isAuthenticated, async (req, res) => {
  const { name, actions } = req.body;
  const newPermission = new Permission({ name, actions});
   try{
     const savedPermission = await newPermission.save(); 
      res.json(savedPermission);
    }
    catch(err) {
        res.json({message: err})
    }
});


//GET SPECIFIC PERMISSION
router.get('/:id', isAuthenticated, checkPermissions('permissions'), async (req, res) => {
  try{
    const getPermission = await Permission.findOne({ _id: req.params.id });
    res.json(getPermission)
  }
  catch(err){
    res.status(404).json({message:err})
  }
});


//DELETE PERMISSION
router.delete('/:id', isAuthenticated, checkPermissions('permissions'), async (req, res) =>{
  try{ 
    const removePermission = await Permission.deleteOne({_id: req.params.id})
    res.json("Permission Deleted")
  }
  catch(err){
      res.status(404).json({message:err})
  }
});


 //UPDATE PERMISSION
router.put('/:id', isAuthenticated, checkPermissions('permissions'), async (req, res) =>{
  try{
    const updatePermission = await Permission.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Permission Updated")
  }
  catch(err){
    res.status(404).json({message:err})
  }
});

module.exports = router;