const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// on save hook, encrypt password
// before the model get saved, run this function
userSchema.pre("save", function (next) {
  // getting access to the user model
  const user = this;
  // lets generate a salt, it might take some millisecs, and then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash (or encrypt) our password using the generated salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;
