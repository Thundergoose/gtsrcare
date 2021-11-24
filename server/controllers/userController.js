const db = require('../models/dbModel.js');
const bcrypt = require('bcrypt');

const userController = {};

// POST request to /users/login
userController.loginUser = (req, res, next) => {
  // Extract username and password from req.body
  const { username, password } = req.body;

  // If username or password not found
  if (!username || !password) {
    return next({
      log: 'userController.loginUser error: Username or password was not provided.',
      status: 400,
      message: { err: 'Failed to log in. Username or password not provided.' },
    });
  }

  // Else, query db to see if user exists
  const userQuery = `SELECT * FROM users WHERE username = '${username}'`;
  db.query(userQuery)
    .then((foundUser) => {
      // If user with that username does not exist
      if (!foundUser.rows.length) {
        res.locals.errorMessage = "The username and/or password you entered are invalid. Please try again. Or don't. IdGAF. ";
        return res.status(200).json({ message: res.locals.errorMessage })
        // return next({
        //   log: 'userController.loginUser: Username not found in database.',
        //   status: 400,
        //   message: {
        //     err: 'userController.loginUser: Username not found in database.',
        //   },
        // });
      }

      const compare = bcrypt.compareSync(password, foundUser.rows[0].password);
      
      // If user does exist in username, verify password
      if (compare) {
        res.locals.user_id = foundUser.rows[0].id;
        return next();
      }

      // If user exists, but password does NOT matchs
      else {
        res.locals.errorMessage = "The username and/or password (but really your password lmao k bye) you entered does not match our records. Please try again (*wink wink*).";
        return res.status(200).json({ message: res.locals.errorMessage })
        // next({
        //   log: 'userController.loginUser: Password does not match.',
        //   status: 400,
        //   message: {
        //     err: 'userController.loginUser: Password does not match.',
        //   },
        // });
      }
    })

    .catch((err) => {
      return next({
        log: 'userController.loginUser: Error in querying the database.',
        status: 500,
        message: {
          err: 'userController.loginUser: Error in querying the database.',
        },
      });
    });
};

// POST request to /users/signup
userController.registerUser = (req, res, next) => {
  // Extract username, password, and optional name from req.body
  const { username, password, name } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  // If username or password not found, invoke global error handler
  if (!username || !password) {
    return next({
      log: 'userController.registerUser: Username or password not provided.',
      status: 400,
      message: {
        err: 'userController.registerUser: Username or password not provided.',
      },
    });
  }

  // If name is not defined, reassign value to null before inserting into db
  if (!name) name = null;

  // Insert new user into db
  const queryString = `INSERT INTO users (username, name, password)
  VALUES ($1, $2, $3)
  RETURNING id`;

  // Values array
  const values = [username, name, hashPassword];

  // Database query
  db.query(queryString, values)
    .then((newUser) => {
      // console.log(newUser);
      res.locals.user_id = newUser.rows[0].id;
      console.log(res.locals.user_id);
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.registerUser error: ${err}`,
        status: 500,
        message: { err: 'Failed to register user.' },
      });
    });
};

module.exports = userController;
