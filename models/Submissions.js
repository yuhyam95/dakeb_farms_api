const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
    formname: { type: String},
    submittedBy: {
      name: {
        type: String
      },
      department: {
        type: String
      },
      position: {
        type: String
      }
    },
    data: [{ field:  {
      type: String
    }, value:  {
      type: String
    } }],
  });

  module.exports = mongoose.model("Submission", submissionSchema);
