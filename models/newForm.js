const mongoose = require('mongoose');

const newFormSchema = new mongoose.Schema({
    name: {
        type: String
      },
    descriptiom: {
        type: String
      },
    createdBy: {
        type: String
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

module.exports = mongoose.model("newForm", newFormSchema);
