const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
     type: String
   },
   email: {
        type: String
    },
    salary: {
        type: String
    },
    phonenumber: {
        type: Number
      },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' },  
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' },
    usertype: {
        type: String
      },
    password: {
        type: String
      },      
  },
  
  {timestamps: true}
  );

module.exports = mongoose.model("User", userSchema);
