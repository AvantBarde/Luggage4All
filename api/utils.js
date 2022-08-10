const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401).send({
      name: "AuthErr",
      message: "You must be logged in to perform this action",
    });
    next();
  }

  next();
}

function requireAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(401).send({
      name: "AuthErr",
      message: "You must be an admin to perform this action",
    });
    next();
  }
  next();
}

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    next({
      name: "VerificationErr",
      message: "No token provided",
    });
  }
  const [, token] = req.headers.authorization.split("Bearer ");
  const validatedToken = jwt.verify(token, JWT_KEY);

  if (validatedToken) {
    next();
  } else {
    res.status(401).send({
      name: "UnauthorizedError",
      message: "You must be logged in to perform this action",
    });
  }
}

module.exports = {
  requireUser,
  requireAdmin,
  verifyToken
};
