const express = require('express')
const router = express.Router()
const PaySlip = require('../models/PaySlip.js')


//GET PAYSLIPS
router.get('/', async (req, res) => {
    try{
       const getPaySlips = await PaySlip.find().sort({createdAt: -1});
        res.json(getPaySlips)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW PAYSLIP
router.post("/", async (req, res) => {
  const { salary, bonus, deductions, reasonfordeductions, generatedby, payperiod, user } = req.body;
  const newPayslip = new Payslip({ salary, bonus, deductions, reasonfordeductions, generatedby, payperiod, user });
   try{
     const savedPayslip = await newPayslip.save(); 
      res.json(savedPayslip);
    }
    catch(err) {
        res.json({message: err})
    }
});


//GET SPECIFIC PAYSLIP
router.get('/:id', async (req, res) => {
  try{
    const getPaySlip = await PaySlip.findOne({ _id: req.params.id });
    res.json(getPaySlip)
  }
  catch(err){
    res.json({message:err})
  }
});


//DELETE PAYSLIP
router.delete('/:id', async (req, res) =>{
  try{ 
    const removePaySlip = await PaySlip.deleteOne({_id: req.params.id})
    res.json(removePaySlip)
  }
  catch(err){
      res.json({message:err})
  }
});


 //UPDATE PAYSLIPs
router.patch('/:id', async (req, res) =>{
  try{
    const updatePaySlip = await PaySlip.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json(updatePayslip)
  }
  catch(err){
    res.json({message:err})
  }
});

module.exports = router;