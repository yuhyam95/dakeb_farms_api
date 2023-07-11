const express = require('express')
const router = express.Router()
const Report = require('../models/Report.js')


//GET REPORTS
router.get('/', async (req, res) => {
    try{
       const getReports = await Report.find().sort({createdAt: -1});
        res.json(getReports)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW REPORT
router.post("/", async (req, res) => {
  const { reportdetails, category, priority, status, user } = req.body;
  const newReport = new Report({ reportdetails, category, priority, status, user });
   try{
     const savedReport = await newReport.save(); 
      res.json(savedReport);
    }
    catch(err) {
        res.json({message: err})
    }
});


//GET SPECIFIC REPORT
router.get('/:id', async (req, res) => {
  try{
    const getReport = await Report.findOne({ _id: req.params.id });
    res.json(getReport)
  }
  catch(err){
    res.json({message:err})
  }
});


//DELETE REPORT
router.delete('/:id', async (req, res) =>{
  try{ 
    const removeReport = await Report.deleteOne({_id: req.params.id})
    res.json(removeReport)
  }
  catch(err){
      res.json({message:err})
  }
});


 //UPDATE REPORT
router.patch('/:id', async (req, res) =>{
  try{
    const updateReport = await Report.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json(updateReport)
  }
  catch(err){
    res.json({message:err})
  }
});

module.exports = router;