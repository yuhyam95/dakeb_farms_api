const User = require('../models/User')
const Role = require('../models/Role')

// const roles = {
//   Admin: {
//     users: ['post', 'get', 'put', 'delete'],
//     reports: ['post', 'get', 'put', 'delete'],
//     payslips: ['post', 'get', 'put', 'delete'],
//     hunters: ['post', 'get', 'put', 'delete'],
//     forms: ['post', 'get', 'put', 'delete'],
//     departments: ['post', 'get', 'put', 'delete'],
//     positions: ['post', 'get', 'put', 'delete'],
//     roles: ['post', 'get', 'put', 'delete'] 
//   },
  
//   User: {
//     reports: ['post', 'get', 'put', 'delete'],
//     payslips: ['get'],
//     hunters: ['post', 'get', 'put', 'delete'],
//     forms: ['post', 'get', 'put'],
//     departments: ['get'],
//     positions: ['get'],
//     roles: ['get']
//   },
// };

// const checkPermissions = (resource) => (req, res, next) => {
//   console.log("Checking Permissions....");
//   //const userRole = req.user.role; // Get the user role from JWT payload
//   const userRole = req.userRole;
//   const userPermissions = roles[userRole];
//   const resourcePermissions = userPermissions[resource];

//   if (!resourcePermissions) {
//     return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
//   }

//   const action = req.method.toLowerCase(); // Get the HTTP method (e.g., 'get', 'post', 'put', 'delete')
//   if (!resourcePermissions.includes(action)) {
//     return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
//   }

//   return next();
// };

// module.exports = {
//   checkPermissions,
// }; 

// const checkPermissions = (resource) => async (req, res, next) => {
//   console.log("Checking Permissions....");

//   try {
//     const user = await User.findById(req.user._id).populate('role');
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }
    
//     const userPermissions = user.role.permissions;
//     const resourcePermissions = userPermissions.find(perm => perm.resource === resource);
    
//     if (!resourcePermissions) {
//       return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
//     }

//     const action = req.method.toLowerCase();
//     if (!resourcePermissions.actions.includes(action)) {
//       return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
//     }

//     return next();
//   } catch (error) {
//     return res.status(500).json({ message: 'Error checking permissions' });
//   }
// };

const checkPermissions = (resource) => async (req, res, next) => {
  console.log("Checking Permissions....");

  try {
    const user = await User.findById(req.userId).populate('role');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const role = await Role.findById(user.role.id)
    const userPermissions = role.permissions;
    const resourcePermissions = userPermissions.find(perm => perm.name === resource);

    if (!resourcePermissions) {
      return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
    }

    const action = req.method.toLowerCase();
    if (!resourcePermissions.actions.includes(action)) {
      return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error checking permissions' });
  }
};


module.exports = {
  checkPermissions,
}; 
