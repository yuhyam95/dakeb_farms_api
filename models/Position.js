const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
   name: {
     type: String
   },   
   description: {
    type: String
   },
   status: {
    type: Boolean
   }   
  },
  
  {timestamps: true}
  );

module.exports = mongoose.model("Position", positionSchema);
