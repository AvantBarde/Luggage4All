const express = require("express");
const dotenv = require("dotenv").config();
const { requireUser } = require("./utils");
const bcrypt = require('bcrypt')


const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserById,
  getAllUsers,
  getUser,
  getUserByUsername,
} = require("../db/models/users");
const usersRouter = express.Router();

usersRouter.use(logger);

usersRouter.get("/test", (req, res) => {
  res.send("simple test");
});

usersRouter.post("/register", async (req, res, next) => {
  const { firstName, lastName, email, imageURL, username, password, isAdmin } = req.body.user;
  console.log('in the api registering')
  console.log('req is: ', req.body)
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      res.send({ message: `A user with username ${username} already exists` });
      next();
    }

    const user = await createUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageURL: imageURL,
      username: username,
      password: password,
      isAdmin: isAdmin,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      process.env.JWT_KEY
    );

    const data = {
      message: "Thank you for registering",
      token: token,
      user: user,
    };
    console.log('you have reached the data', data)
    res.send(data);
    console.log("you've reached this far");
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  try {
    const me = await getUserByUsername(username);
    res.send(me);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body.user
  console.log('user info', req.body.user)
  if (!username || !password) {
    console.log('no username or password, silly')
    return
  }
  try {
    const user = await getUserByUsername(username)
    if (user) {
      const match = await bcrypt.compareSync(password, user.password);

      console.log(password, user.password)
      if (!match) {
        console.log('not a match');
        res.send({ message: 'Username & Password combination is incorrect.' })
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username

          },
          process.env.JWT_KEY
        );
        const confirmation = {
          message: "you're logged in!",
          token: token,
        };
        confirmation.user = user;
        res.send(confirmation);
      }
    }

  } catch (error) {
    next(error);
  }
});



function logger(req, res, next) {
  console.log("loggggg");
  next();
}

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    if (req.user) {
      res.send(req.user);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
