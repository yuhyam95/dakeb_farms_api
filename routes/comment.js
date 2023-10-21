const express = require('express');
const router = express.Router();
const Report = require('../models/Report'); 
const Comment = require('../models/Comment'); 

router.post('/reports/:reportId/comments', async (req, res) => {
    try {
      const reportId = req.params.reportId;
      const { text, author } = req.body;
  
      const newComment = new Comment({
        text,
        author,
      });
  
      const comment = await newComment.save();
  
      await Report.findByIdAndUpdate(reportId, { $push: { comments: comment._id } });
  
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });

  export default router;