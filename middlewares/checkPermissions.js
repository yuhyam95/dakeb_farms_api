
const roles = {
    admin: ['create:user', 'delete:user'],
    user: ['create:forms'],
  };
  
  const checkPermissions = (requiredRoles) => (req, res, next) => {
    // Check if the user has the required role
    const userRole = req.user.role;
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Unauthorized - Insufficient role' });x
    }
  
    // Check if the user has the required permissions based on their role
    const userPermissions = roles[userRole];
    const requiredPermissions = requiredRoles.map((role) => roles[role]).flat();
    const hasRequiredPermissions = requiredPermissions.every(
      (permission) => userPermissions.includes(permission)
    );
  
    if (!hasRequiredPermissions) {
      return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
    }
  
    // If the user has the required role and permissions, allow access to the next middleware or route
    return next();
  };
  
  module.exports = checkPermissions;
  