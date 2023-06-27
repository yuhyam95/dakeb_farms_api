const mongoose = require('mongoose');

const newFormSchema = new mongoose.Schema({
    name: {
        type: String
      },
    description: {
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

  const submissionSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
    data: [{ field:  {
      type: String
    }, value:  {
      type: String
    } }],
  });

module.exports = mongoose.model("Form", newFormSchema);
module.exports = mongoose.model("Submission", submissionSchema);
