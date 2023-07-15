const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
   
    name: {
      type: String
    },
    permissions: [
      {
        name: {
          type: String,
        },
      },
    ],  
    description: {
      type: String
     }      
  },
  
  {timestamps: true}
  );

module.exports = mongoose.model("Role", roleSchema);
