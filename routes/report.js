const express = require('express')
const router = express.Router()
const Report = require('../models/Report.js')
const User = require('../models/User.js')
const Comment = require('../models/Comment.js')
const { isAuthenticated } = require('../middlewares/authMiddleWare.js')
const { checkPermissions } = require('../middlewares/checkPermissions.js');


//GET REPORTS
router.get('/', isAuthenticated, checkPermissions('reports'), async (req, res) => {
    try{
       const getReports = await Report.find().sort({createdAt: -1});
        res.json(getReports)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW REPORT
router.post("/:userId", isAuthenticated, checkPermissions('reports'), async (req, res) => {
  const userId = req.params.userId;
  const { reportdetails, category, priority, status, sentTo } = req.body;
  
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReport = new Report({
      reportdetails,
      category,
      priority,
      status,
      sentTo,
      submittedBy: {
        name: user.name,
        department: user.department,
        position: user.position,
        email: user.email,
        }
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//GET SPECIFIC REPORT
router.get('/:id', isAuthenticated, checkPermissions('reports'), async (req, res) => {
  try{
    const getReport = await Report.findOne({ _id: req.params.id });
    res.json(getReport)
  }
  catch(err){
    res.json({message:err})
  }
});


//DELETE REPORT
router.delete('/:id', isAuthenticated, checkPermissions('reports'), async (req, res) =>{
  try{ 
    const removeReport = await Report.deleteOne({_id: req.params.id})
    res.json("Report deleted")
  }
  catch(err){
      res.json({message:err})
  }
});


 //UPDATE REPORT
router.put('/:id', isAuthenticated, checkPermissions('reports'), async (req, res) =>{
  try{
    const updateReport = await Report.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Report Updated")
  }
  catch(err){
    res.json({message:err})
  }
});

router.post('/:reportId/comment', isAuthenticated, async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const { text } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    
    const newComment = new Comment({
      text,
      author: {
       name: user.name,
       position: user.position 
      }
    });

    const comment = await newComment.save();

    await Report.findByIdAndUpdate(reportId, { $push: { comments: comment._id } });

    res.json(comment);
  } catch (error) {
    console.log(error)
    // res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Endpoint to get comments for a specific report
router.get('/:reportId/comments', async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const report = await Report.findById(reportId).populate('comments');
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report.comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
});


module.exports = router;