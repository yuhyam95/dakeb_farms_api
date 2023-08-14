const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
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
    console.log(req.userRole)
    next();
  });
};

module.exports = {
    authenticateJWT,
  };