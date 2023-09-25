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
      name: {
        type: String
      },
      email: {
        type: String
      },
      department: {
        type: String
      },
      position: {
        type: String
      },
      phonenumber: {
         type: String
      } 
    },    
  },
  {timestamps: true}
  );

module.exports = mongoose.model("PaySlip", paySlipSchema);
