const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  // using subject (sub) from JWT
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  // user has already have their email and password authenticated
  // let's provide a jwt token
  // we can extract the 'user' from req.user, this is supplied by passport done callback
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({ error: "Email and Password required" });
  }
  // see if a user with a given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    // if a user exists, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    // if a user does not exist, create and save user record
    const user = new User({ email: email, password: password });
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      // respond to request indicating user created
      res.json({ token: tokenForUser(User) });
    });
  });
};
