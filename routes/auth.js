const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

// Configure the Local Strategy for passport
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec(); // Use .exec() to handle the query

    if (!user) {
      return done(null, false); // User not found in the database
    }

    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err, false);
  }
});


// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
       // Check the user's status
      if (user.status !== true) {
        return res.status(401).json({ message: 'Account is inactive' });
      }
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY);
       // Include user details in the response
       const userDetails = {
        _id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        position: user.position,
        role: user.role,
        salary: user.salary,
        phonenumber: user.phonenumber

      };
      return res.json({ message: 'Login successful', token, user: userDetails });
    });
  })(req, res, next);
});

module.exports = router;
