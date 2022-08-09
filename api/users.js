const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;  
const { adminRequired } = require("./utils");

// Create a new user. Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.
usersRouter.post("/", async (req, res, next) => {
  const { username, password, firstName, lastName, email } = req.body;
  if (!username || !password || !firstName || !lastName || !email) {
    res.status(400).send("Missing required fields");
  } 
  if (password.length < 8) {
    res.status(400).send("Password must be at least 8 characters long");
    }
  else {
    try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await User.createUser({
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
      });
      res.send(user);
      delete user.hashedPassword;
    } catch (error) {
      next(error);
    }
  }
}
);

// Log in the user. Require username and password, and verify that plaintext login password matches the saved hashed password before returning a JSON Web Token.
usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send("Missing required fields");
    } else {
        try {
        const user = await User.getUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            res.send({ token });
        } else {
            res.status(401).send("Invalid username or password");
        }
        } catch (error) {
        next(error);
        }
    }
    }
);

// Send back the logged-in user's data if a valid token is supplied in the header.
usersRouter.get("/me", async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send("No token");
    } else {
        try { 
        const user = await User.getUserById(jwt.verify( token, process.env.JWT_KEY ).id);
        if (user) {
            res.send(user);
        }
        } catch (error) {
        next(error);
        }
    }
    }
);

// update user admin rights
usersRouter.patch("/:userId", adminRequired, async (req, res, next) => {
    const { userId } = req.params;
    const { isAdmin } = req.body;
    if (!userId || !isAdmin) {
        res.status(400).send("Missing required fields");
    } else {
        try {
        const user = await User.updateUser(userId, isAdmin);
        res.send(user);
        } catch (error) {
        next(error);
        }
    }
    }
);

// delete user from database, requires admin
usersRouter.delete("/:userId", adminRequired, async (req, res, next) => {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).send("Missing required fields");
    } else {
        try {
        const user = await User.deleteUser(userId);
        res.send(user);
        } catch (error) {
        next(error);
        }
    }
    }
);

// admin get all user info

usersRouter.get("/", adminRequired, async (req, res, next) => {
    try {
    const users = await User.getAllUsers();
    res.send(users);
    } catch (error) {
    next(error);
    }
    }
);

// updateuser(user)
usersRouter.patch("/:userId", adminRequired, async (req, res, next) => {
    const { userId } = req.params;
    const { username, password, firstName, lastName, email } = req.body;
    if (!userId || !username || !password || !firstName || !lastName || !email) {
        res.status(400).send("Missing required fields");
    } else {
        try {
        const user = await User.updateUser(userId, username, password, firstName, lastName, email);
        res.send(user);
        } catch (error) {
        next(error);
        }
    }
    }
);






module.exports = usersRouter;
