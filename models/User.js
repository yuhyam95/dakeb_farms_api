const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true
   },
   email: {
        type: String,
        required: true    
    },
    salary: {
        type: String
    },
    phonenumber: {
        type: Number
      },
    department: { type: String },
    position: { type: String },  
    role: { 
      id: {type: String},
      name: {type: String}
     },
    status: {type: Boolean, default: true},
    password: {
        type: String,
      },      
      resetToken: {
        type: String
      }, 
      resetTokenExpires: {
        type: String
      }
  },
  
  {timestamps: true}
  );

  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      return next(err);
    }
  });
  
  userSchema.methods.comparePassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      throw err;
    }
  };

module.exports = mongoose.model("User", userSchema);
