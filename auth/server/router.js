const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = function (app) {
  // to intercept get request
  app.get("/", requireAuth, function (req, res) {
    res.send({ hi: "there" });
  });
  // to intercept post request
  app.post("/signin", requireSignIn, Authentication.signin);
  app.post("/signup", Authentication.signup);
};
