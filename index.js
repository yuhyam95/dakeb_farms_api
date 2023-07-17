const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require("cors");
const path = require('path');
const session = require('express-session');
const passport = require('passport');



//connect to database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to database...'))
.catch(err => console.error('Could not connect to database...', err));

//routes
app.use(cors());
const departmentRoute = require('./routes/department.js');
const formsRoute = require('./routes/form.js');
const hunterRoute = require('./routes/hunter.js');
const payslipRoute = require('./routes/payslip.js');
const positionRoute = require('./routes/position.js');
const reportRoute = require('./routes/report.js');
const roleRoute = require('./routes/role.js');
const userRoute = require('./routes/user.js');
const authRoute = require('./routes/auth.js')

app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );
  
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  const { isAuthenticated } = require('./middlewares/authMiddleWare');
  
//middlewares 
app.use(express.json());
app.use('/api/department', departmentRoute);
app.use('/api/form', formsRoute);
app.use('/api/hunter', hunterRoute);
app.use('/api/payslip', payslipRoute);
app.use('/api/position', positionRoute);
app.use('/api/report', reportRoute);
app.use('/api/role', roleRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));

