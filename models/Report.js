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
      type: String
    },
    sentTo: {
      type: String
    },
  },

  {timestamps: true}
  );

module.exports = mongoose.model("Report", reportSchema);
