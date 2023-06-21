const mongoose = require('mongoose');

const hunterSchema = new mongoose.Schema({
   name: {
     type: String
   },
   email: {
    type: String
    },
    phonenumber: {
        type: String
    },
    type: {
        type: String
    },
    code: {
        type: String
      },      
  },
  
  {timestamps: true}
  );

module.exports = mongoose.model("Hunter", hunterSchema);
