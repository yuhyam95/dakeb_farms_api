const express = require('express')
const router = express.Router()
const Form = require('../models/Form.js')
const Submission = require('../models/Submissions.js')
const User = require('../models/User.js')
const { isAuthenticated } = require('../middlewares/authMiddleWare.js')
const { checkOwnership } = require('../middlewares/checkOwnership.js');
const { checkPermissions } = require('../middlewares/checkPermissions.js');


//GET FORMS
router.get('/', isAuthenticated, checkPermissions('forms'), async (req, res) => {
    try{
       const getForms = await Form.find().sort({createdAt: -1});
        res.json(getForms)
    }
    catch(err){
      console.error('Error in route handler:', err);
      res.json({message:err});
    }
});

//NEW FORM
router.post("/:userId", isAuthenticated, checkPermissions('forms'), async (req, res) => {
  const userId = req.params.userId;
  const { name, description, status, fields, sentTo } = req.body;
  
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  const newForm = new Form({ 
    name, 
    description, 
    createdBy: {
    name: user.name,
    department: user.department,
    position: user.position,
    phonenumber: user.phonenumber,
    salary: user.salary,
    email: user.email,
    datejoined: user.createdAt
    }, 
    status,
    sentTo, 
    fields });
  
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//GET SPECIFIC FORM
router.get('/:id', isAuthenticated, async (req, res) => {
  try{
    const getForm = await Form.findOne({ _id: req.params.id });
    res.json(getForm)
  }
  catch(err){
    res.json({message:err})
  }
});


//DELETE FORM
router.delete('/:id',isAuthenticated, checkPermissions('forms'), async (req, res) =>{
  try{ 
    const removeForm = await Form.deleteOne({_id: req.params.id})
    res.json("Form deleted")
  }
  catch(err){
      res.json({message:err})
  }
});


 //UPDATE FORMs
router.put('/:id', isAuthenticated, checkPermissions('forms'), async (req, res) =>{
  try{
    const updateForm = await Form.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Form Updated")
  }
  catch(err){
    res.json({message:err})
  }
});

// SUBMIT A FORM
router.post('/:formId/:userId/submit', isAuthenticated, checkPermissions('forms'), async (req, res) => {
  const formId = req.params.formId;
  const userId = req.params.userId;
  const data = req.body;

  console.log('Received data:', data); 


  try {
    const form = await Form.findById(formId);
    const user = await User.findById(userId);
    if (!form || !user) {
      res.status(404).send('Form or User not found');
      return;
    }

    const submissionData = data.data.map(({ field, value }) => ({
      field: field,   
      value: value,   
    }));

    const submission = new Submission({
      formId: form._id,
      formname: form.name,
      submittedBy:{
        name: user.name,
        department: user.department,
        position: user.position
      },
      data: submissionData,
    });

    await submission.save();
    res.status(201).send('Form submitted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting form');
  }
});

// GET FORM SUBMISSIONS
router.get('/:formId/submissions', isAuthenticated, checkPermissions('forms'), async (req, res) => {
  const formId = req.params.formId;

  try {
    const form = await Form.findById(formId);
    if (!form) {
      res.status(404).send('Form not found');
      return;
    }

    const submissions = await Submission.find({ formId: form._id });
    res.send(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving submissions');
  }
});



module.exports = router;