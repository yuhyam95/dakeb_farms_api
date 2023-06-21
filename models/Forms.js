const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
   
   animalspecie: {
     type: String
   },
   sex: {
    type: String
    },
    age: {
        type: Number
    },
    breeding: {
        type: String
    },
    animalnumber: {
        type: Number
      },
    housinglocation: {
        type: String
      },
    deformity: {
        type: String
      },
    housingunit: {
        type: String
      },
    husbandrypractices: {
        type: String
      },
    husbandryprovisions: {
        type: String
      },
    vetinarypractices: {
        type: String
      },
    user:[{
        name:{
          type: String
        },
        department:{
          type: String
        },
        position:{
            type: String
          }
       }]          
  },
  
  {timestamps: true}
  );

module.exports = mongoose.model("Form", formSchema);
