const express = require('express')
const router = express.Router()
const Department = require('../models/Department.js')
const { isAuthenticated } = require('../middlewares/authMiddleWare.js')
const { checkPermissions } = require('../middlewares/checkPermissions.js');


//GET DEPARTMENTS
router.get('/', isAuthenticated, checkPermissions('departments'), async (req, res) => {
    try{
       const getDepartments = await Department.find().sort({createdAt: -1});
        res.json(getDepartments)
    }
    catch(err){
      res.status(404).json({message:err});
    }
});

//NEW DEPARTMENT
router.post("/", isAuthenticated, checkPermissions('departments'), async (req, res) => {
  const { name, description } = req.body;
  const newDepartment = new Department({ name, description });
   try{
     const savedDepartment = await newDepartment.save(); 
      res.json(savedDepartment);
    }
    catch(err) {
        res.json({message: err})
    }
});


//GET SPECIFIC DEPARTMENT
router.get('/:id', isAuthenticated, checkPermissions('departments'), async (req, res) => {
  try{
    const getDepartment = await Department.findOne({ _id: req.params.id });
    res.json(getDepartment)
  }
  catch(err){
    res.status(404).json({message:err})
  }
});


//DELETE DEPARTMENT
router.delete('/:id', isAuthenticated, checkPermissions('departments'), async (req, res) =>{
  try{ 
    const removeDepartment = await Department.deleteOne({_id: req.params.id})
    res.json("Department Deleted")
  }
  catch(err){
      res.status(404).json({message:err})
  }
});


 //UPDATE DEPARTMENT
router.put('/:id', isAuthenticated, checkPermissions('departments'), async (req, res) =>{
  try{
    const updateDepartment = await Department.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Department Updated")
  }
  catch(err){
    res.status(404).json({message:err})
  }
});

module.exports = router;