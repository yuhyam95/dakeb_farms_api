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
        },
        phonenumber: {
          type: String
        },
        salary: {
          type: String
        },
        email: {
          type: String
        },
        datejoined: {
          type: String
        }
      }, 
    status: {
        type: String
      },
    priority: {
        type: String
      },
    sentTo: {
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
