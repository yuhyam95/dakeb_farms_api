
const roles = {
  admin: {
    users: ['create', 'read', 'update', 'delete'],
    reports: ['create', 'read', 'update', 'delete'],
    payslips: ['create', 'read', 'update', 'delete'],
    hunters: ['create', 'read', 'update', 'delete'],
    forms: ['create', 'read', 'update', 'delete'],
    departments: ['create', 'read', 'update', 'delete'],
    positions: ['create', 'read', 'update', 'delete'],
    roles: ['read'], // Admins can only read roles, as they have full control over permissions
  },
  
  user: {
    reports: ['create', 'read', 'update', 'delete'],
    payslips: ['create', 'read', 'update', 'delete'],
  },
};

// Middleware to check user's roles and permissions for a resource
const checkResourcePermissions = (resource) => (req, res, next) => {
  const userRole = req.user.role;
  const userPermissions = roles[userRole];
  const resourcePermissions = userPermissions[resource];

  if (!resourcePermissions) {
    return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
  }

  const action = req.method.toLowerCase(); // Get the HTTP method (e.g., 'get', 'post', 'put', 'delete')
  if (!resourcePermissions.includes(action)) {
    return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
  }

  return next();
};


  
  // const checkPermissions = (requiredRoles) => (req, res, next) => {
  //   // Check if the user has the required role
  //   const userRole = req.user.role;
  //   if (!requiredRoles.includes(userRole)) {
  //     return res.status(403).json({ message: 'Unauthorized - Insufficient role' });x
  //   }
  
  //   // Check if the user has the required permissions based on their role
  //   const userPermissions = roles[userRole];
  //   const requiredPermissions = requiredRoles.map((role) => roles[role]).flat();
  //   const hasRequiredPermissions = requiredPermissions.every(
  //     (permission) => userPermissions.includes(permission)
  //   );
  
  //   if (!hasRequiredPermissions) {
  //     return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
  //   }
  
  //   // If the user has the required role and permissions, allow access to the next middleware or route
  //   return next();
  // };
  
  module.exports = checkPermissions;
  