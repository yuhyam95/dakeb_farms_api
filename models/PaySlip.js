const mongoose = require('mongoose');

const paySlipSchema = new mongoose.Schema({
   salary: {
     type: String
   },
   bonus: {
    type: String
    },
   deductions: {
        type: String
    },
   reasonfordeductions: {
        type: String
    },
   generatedby: {
        type: String
    },
   payperiod: {
        type: String
    }, 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },    
  },
  {timestamps: true}
  );

module.exports = mongoose.model("PaySlip", paySlipSchema);
