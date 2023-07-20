const isAuthenticated = (req, res, next) => {
  // Assuming you have set up authentication and the user object is available in req.user
  if (req.isAuthenticated() && req.user && req.user.role) {
    // If user is authenticated and has a role, attach the role to the req object
    const userRole = req.user.role;
    req.userRole = userRole;
    
    return next();
  }

  // If user is not authenticated or does not have a role, send an error response
  res.status(401).json({ message: 'Unauthorized - Please login' });
};

module.exports = {
  isAuthenticated,
};
