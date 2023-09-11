const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
   
    name: {
      type: String
    },  
    description: {
      type: String
     },
     permissions: {
      type: Array
     },      
  },
  {timestamps: true}
  );

module.exports = mongoose.model("Role", roleSchema);
