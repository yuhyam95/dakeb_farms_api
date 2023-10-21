const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
   reportdetails: {
     type: String
   },
   category: {
    type: String
    },
   priority: {
        type: String
    },
   status: {
        type: Boolean
    },
    submittedBy: {
      name: {
        type: String
      },
      department: {
        type: String
      },
      position: {
        type: String
      },
      email: {
        type: String
      }
    },
    sentTo: {
      type: String
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },

  {timestamps: true}
  );

module.exports = mongoose.model("Report", reportSchema);
