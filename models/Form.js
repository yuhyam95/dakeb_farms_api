const mongoose = require('mongoose');

const newFormSchema = new mongoose.Schema({
    name: {
        type: String
      },
    description: {
        type: String
      },
    createdBy: {
        name: {
          type: String
        },
        department: {
          type: String
        },
        position: {
          type: String
        }
      },
    status: {
        type: String
      },
    fields: [{ name: {
        type: String
      }, 
      type: {
        type: String
      }}],          
  },
  
  {timestamps: true}
  );

  
module.exports = mongoose.model("Form", newFormSchema);
