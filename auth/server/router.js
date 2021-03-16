const Authentication = require("./controllers/authentication");

module.exports = function (app) {
  // to intercept get request

  // to intercept post request

  app.post("/signup", Authentication.signup);
};
