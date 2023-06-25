const express = require('express')
const router = express.Router()
const Form = require('../models/newForm.js')

//GET FORMS
router.get('/', async (req, res) => {
    try{
       const getForms = await Form.find().sort({createdAt: -1});
        res.json(getForm)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW FORM
router.post("/", async (req, res) => {
  const { name, description, createdBy, status, fields } = req.body;
  const newForm = new Form(req.body);
   try{
     const savedForm = await newForm.save(); 
      res.json(savedForm);
    }
    catch(err) {
        res.json({message: err})
    }
});


//GET SPECIFIC FORM
router.get('/:id', async (req, res) => {
  try{
    const getForm = await Form.findOne({ _id: req.params.id });
    res.json(getForm)
  }
  catch(err){
    res.json({message:err})
  }
});


//DELETE FORM
router.delete('/:id', async (req, res) =>{
  try{ 
    const removeForm = await Form.deleteOne({_id: req.params.id})
    res.json(removeForm)
  }
  catch(err){
      res.json({message:err})
  }
});


 //UPDATE FORMs
router.patch('/:id', async (req, res) =>{
  try{
    const updateForm = await Form.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json(updateForm)
  }
  catch(err){
    res.json({message:err})
  }
});






module.exports = router;