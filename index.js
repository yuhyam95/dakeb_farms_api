const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require("cors");
const path = require('path');


//connect to database
//mongoose.connect('')
mongoose.connect('mongodb://localhost/dakeb-farms-api')
.then(() => console.log('Connected to database...'))
.catch(err => console.error('Could not connect to database...', err));

//routes
app.use(cors());
const formsRoute = require('./routes/forms.js');


//middlewares 
app.use(express.json());
app.use('/api/forms', formsRoute);


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));

