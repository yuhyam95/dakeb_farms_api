// const isAuthenticated = (req, res, next) => {
//   // Assuming you have set up authentication and the user object is available in req.user
//   if (req.isAuthenticated() && req.user && req.user.role) {
//     // If user is authenticated and has a role, attach the role to the req object
//     const userRole = req.user.role;
//     req.userRole = userRole;
    
//     return next();
//   }

//   // If user is not authenticated or does not have a role, send an error response
//   res.status(401).json({ message: 'Unauthorized - Please login' });
// };

// module.exports = {
//   isAuthenticated,
// };


const jwt = require('jsonwebtoken');


const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    console.log('Decoded JWT:', decoded);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = {
    isAuthenticated,
  };