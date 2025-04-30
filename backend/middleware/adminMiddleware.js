const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return next(); 
    }
    return res.status(403).json({ message: 'Access denied: Admins only' });
  };
  
  export default adminMiddleware;
  