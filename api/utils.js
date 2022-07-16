function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "No User",
        message: "You must be logged in to perform this action",
      });
    }
  
    next();
  }
  
  function requireAdmin(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingAdminError",
        message: "You must be logged in as Admin to perform this action",
      });
    }
  
    next();
  }