const express = require('express')
const router = express.Router()
const PaySlip = require('../models/PaySlip.js')
const User = require('../models/User.js')
const { isAuthenticated } = require('../middlewares/authMiddleWare.js')
const { checkPermissions } = require('../middlewares/checkPermissions.js');


//GET PAYSLIPS
router.get('/', isAuthenticated, checkPermissions('payslips'), async (req, res) => {
    try{
       const getPaySlips = await PaySlip.find().sort({createdAt: -1});
        res.json(getPaySlips)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW PAYSLIP
router.post("/:userId", isAuthenticated, checkPermissions('payslips'), async (req, res) => {
  const { salary, bonus, deductions, reasonfordeductions, generatedby, payperiod } = req.body;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPaySlip = new PaySlip({
      salary,
      bonus,
      deductions,
      reasonfordeductions,
      generatedby,
      payperiod,
      user: {
        name: user.name,
        email: user.email,
        department: user.department,
        position: user.position,
        phonenumber: user.phonenumber
      }
    });

    const savedPayslip = await newPaySlip.save();
    res.status(201).json(savedPayslip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//GET SPECIFIC PAYSLIP
router.get('/:id', isAuthenticated, checkPermissions('payslips'), async (req, res) => {
  try{
    const getPaySlip = await PaySlip.findOne({ _id: req.params.id });
    res.json(getPaySlip)
  }
  catch(err){
    res.status(404).json({message:err})
  }
});


//DELETE PAYSLIP
router.delete('/:id', isAuthenticated, checkPermissions('payslips'), async (req, res) =>{
  try{ 
    const removePaySlip = await PaySlip.deleteOne({_id: req.params.id})
    res.json("Payslip Deleted")
  }
  catch(err){
      res.status(404).json({message:err})
  }
});


 //UPDATE PAYSLIPs
router.put('/:id', isAuthenticated, checkPermissions('payslips'), async (req, res) =>{
  try{
    const updatePaySlip = await PaySlip.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Payslip Updated")
  }
  catch(err){
    res.status(404).json({message:err})
  }
});

module.exports = router;
