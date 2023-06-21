const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
     type: String
   },
   position: {
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
    role: {
        type: String
      },
    usertype: {
        type: String
      },
    password: {
        type: String
      },      
  });

module.exports = mongoose.model("User", userSchema);
