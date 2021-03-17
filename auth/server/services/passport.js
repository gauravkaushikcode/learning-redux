const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStartegy = require("passport-local");

// create local strategy that will use usernameField
// this is to verify an existing user in the database with its email and password
// the password will be handled automatically but email property needs to be specified
const localOptions = { usernameField: "email" };
const localLogin = new LocalStartegy(
  localOptions,
  function (email, password, done) {
    // verify this email and password,
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }

      // otherwise, call done with false
      if (!user) {
        return done(null, false);
      }

      // if it is the correct email and password
      // compare passwords - is 'password' equal to user.password
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        // if user matches, call done with user
        return done(null, user);
      });
    });
  }
);

// setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

// create JWT Strategy
// this is to authenticate a request once existing user makes some request
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // see if the user Id in the payload exists in our database
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    // if it does, call 'done' callback with that user object
    if (user) {
      done(null, user);
    }

    // otherwise, call done without a user object
    else {
      done(null, false);
    }
  });
});
// Tell passport to use the Staretegy
passport.use(jwtLogin);
passport.use(localLogin);
