// Middleware to check ownership of a resource
const checkOwnership = (resourceModel) => async (req, res, next) => {
    const resourceId = req.params.resourceId; 
    const userId = req.user._id; 
  
    try {
      const resource = await resourceModel.findById(resourceId);
  
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
  
      if (resource.createdBy.toString() !== userId) {
        return res.status(403).json({ message: 'Unauthorized - You do not own this resource' });
      }
  
      // If the user owns the resource, allow access to the next middleware or route
      return next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error checking ownership' });
    }
  };
  