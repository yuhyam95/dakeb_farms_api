const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
   
    name: {
      type: String
    },  
    description: {
      type: String
     },
     permissions: [
      {
        name: {type: String},
        actions: [String],
      },
    ],      
  },
  {timestamps: true}
  );

module.exports = mongoose.model("Role", roleSchema);
