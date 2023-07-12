const express = require('express')
const router = express.Router()
const Position = require('../models/Position.js')


//GET POSITIONS
router.get('/', async (req, res) => {
    try{
       const getPositions = await Position.find().sort({createdAt: -1});
        res.json(getPositions)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW POSITION
router.post("/", async (req, res) => {
  const { name } = req.body;
  const newPosition = new Position({ name });
   try{
     const savedPosition = await newPosition.save(); 
      res.json(`${savedPosition.name} created`);
    }
    catch(err) {
        res.json({message: err})
    }
});


//GET SPECIFIC POSITION
router.get('/:id', async (req, res) => {
  try{
    const getPosition = await Position.findOne({ _id: req.params.id });
    res.json(getPosition)
  }
  catch(err){
    res.status(404).json({message:err})
  }
});


//DELETE POSITION
router.delete('/:id', async (req, res) =>{
  try{ 
    const removePosition = await Position.deleteOne({_id: req.params.id})
    res.json("Position Deleted")
  }
  catch(err){
      res.status(404).json({message:err})
  }
});


 //UPDATE POSITION
router.put('/:id', async (req, res) =>{
  try{
    const updatePosition = await Position.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Position Updated")
  }
  catch(err){
    res.status(404).json({message:err})
  }
});

module.exports = router;