const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      // If user is authenticated, allow access to the next middleware or route
      return next();
    }
  
    // If user is not authenticated, redirect to the login page or send an error response
    res.status(401).json({ message: 'Unauthorized - Please login' });
  };
  
  module.exports = {
    isAuthenticated,
  };
  