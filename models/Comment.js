const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String
    },
    role: {
      type: String
    }
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
