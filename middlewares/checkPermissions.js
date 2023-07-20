
const roles = {
  Admin: {
    users: ['create', 'read', 'update', 'delete'],
    reports: ['create', 'read', 'update', 'delete'],
    payslips: ['create', 'read', 'update', 'delete'],
    hunters: ['create', 'read', 'update', 'delete'],
    forms: ['create', 'get', 'update', 'delete'],
    departments: ['create', 'read', 'update', 'delete'],
    positions: ['create', 'read', 'update', 'delete'],
    roles: ['create', 'read', 'update', 'delete'] 
  },
  
  User: {
    reports: ['create', 'read', 'update', 'delete'],
    payslips: ['read'],
    hunters: ['create', 'read', 'update', 'delete'],
    forms: ['create', 'read', 'update', 'delete']
  },
};

//Middleware to check user's roles and permissions for a resource
const checkPermissions = (resource) => (req, res, next) => {
  console.log("Checking Permissions....");
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
  
module.exports = {
  checkPermissions,
};
 