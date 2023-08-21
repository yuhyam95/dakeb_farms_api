const roles = {
  Admin: {
    users: ['post', 'get', 'put', 'delete'],
    reports: ['post', 'get', 'put', 'delete'],
    payslips: ['post', 'get', 'put', 'delete'],
    hunters: ['post', 'get', 'put', 'delete'],
    forms: ['post', 'get', 'put', 'delete'],
    departments: ['post', 'get', 'put', 'delete'],
    positions: ['post', 'get', 'put', 'delete'],
    roles: ['post', 'get', 'put', 'delete'] 
  },
  
  User: {
    reports: ['post', 'get', 'put', 'delete'],
    payslips: ['get'],
    hunters: ['post', 'get', 'put', 'delete'],
    forms: ['post', 'get', 'put'],
    departments: ['get'],
    positions: ['get'],
    roles: ['get']
  },
};

const checkPermissions = (resource) => (req, res, next) => {
  console.log("Checking Permissions....");
  //const userRole = req.user.role; // Get the user role from JWT payload
  const userRole = req.userRole;
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