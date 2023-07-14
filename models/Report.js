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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  {timestamps: true}
  );

module.exports = mongoose.model("Report", reportSchema);
