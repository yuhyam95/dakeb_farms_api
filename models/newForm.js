const mongoose = require('mongoose');

const newFormSchema = new mongoose.Schema({
    name: String,
    descriptiom: String,
    createdBy: String,
    status: String,
    fields: [{ name: String, type: String }],          
  },
  
  {timestamps: true}
  );

module.exports = mongoose.model("newForm", newFormSchema);
