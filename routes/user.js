const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const Department = require('../models/Department.js')
const Position = require('../models/Position.js')
const Role = require('../models/Role.js')
const { isAuthenticated } = require('../middlewares/authMiddleWare.js')
const { checkPermissions } = require('../middlewares/checkPermissions.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

function generateRandomPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}
 
function generateResetToken() {
  const min = 1000; 
  const max = 9999; 
  const token = Math.floor(Math.random() * (max - min + 1)) + min;
  return token.toString(); 
}

//GET USERS
router.get('/', isAuthenticated, checkPermissions('users'), async (req, res) => {
    try{
       const getUsers = await User.find().sort({createdAt: -1}).select('-password -resetToken -resetTokenExpires');
        res.json(getUsers)
    }
    catch(err){
      res.status(404).json({message:err});
    }
});

// CREATE A NEW USER
router.post('/', isAuthenticated, checkPermissions('users'), async (req, res) => {
  try {
    const { name, email, salary, phonenumber, departmentId, positionId, roleId, status } = req.body;

    const department = await Department.findById(departmentId);
    const position = await Position.findById(positionId);
    const role = await Role.findById(roleId);
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const password = generateRandomPassword(8);

    const user = new User({
      name,
      email, 
      salary, 
      phonenumber,
      department: department.name,
      position: position.name,
      role: {
        id: role._id,
        name: role.name
      },
      status,
      password
    });

    await user.save();
    
    const msg = {
      to: user.email,
      from: 'info@dakebfarms.com.ng', 
      subject: 'Welcome to Dakeb Farms',
      text: `Your password is: ${password}`,
    };

    await sgMail.send(msg);


    res.send("User Created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

//GET SPECIFIC USER
router.get('/:id', isAuthenticated, checkPermissions('users'), async (req, res) => {
    try{
      const getUser = await User.findOne({ _id: req.params.id }).select('-password -resetToken -resetTokenExpires');
      res.json(getUser)
    }
    catch(err){
      res.status(404).json("Error getting user")
    }
  });
  
  
  //DELETE USER
  // router.delete('/:id', isAuthenticated, checkPermissions('users'), async (req, res) =>{
  //   try{ 
  //     const removeUser = await User.deleteOne({_id: req.params.id})
  //     res.json("User Deleted")
  //   }
  //   catch(err){
  //       res.status(404).json('Error deleting user')
  //   }
  // });
  

// UPDATE USER
router.put('/:id', isAuthenticated, checkPermissions('users'), async (req, res) => {
  try {
    const { name, email, salary, phonenumber, departmentId, positionId, roleId, status} = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (departmentId) {
      const department = await Department.findById(departmentId);
      if (!department) {
        return res.status(400).json({ error: 'Invalid department ID' });
      }
      user.department = department.name;
    }

    if (positionId) {
      const position = await Position.findById(positionId);
      if (!position) {
        return res.status(400).json({ error: 'Invalid position ID' });
      }
      user.position = position.name;
    }

    if (roleId) {
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(400).json({ error: 'Invalid role ID' });
      }
      user.role = {
        id: role._id,
        name: role.name
      };
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (salary) user.salary = salary;
    if (phonenumber) user.phonenumber = phonenumber;
    if (status !== undefined) {
      user.status = status;
    }

    await user.save();

    res.json("User updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating user' });
  }
});


//PASSWORD RESET REQUEST
router.post('/reset-password-request', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    
    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email with the reset token
    const msg = {
      to: user.email,
      from: 'info@dakebfarms.com.ng', // Set the sender's email address
      subject: 'Password Reset Request',
      text: `Your password reset token is: ${resetToken}`,
    };

    await sgMail.send(msg);

    res.send('Reset token sent to your email');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending reset token');
  }
});

//RESET PASSWORD
router.post('/reset-password', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.resetToken !== token || user.resetTokenExpires < Date.now()) {
      return res.status(400).send('Invalid or expired token');
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.send('Password reset successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error resetting password');
  }
});

  
module.exports = router;
