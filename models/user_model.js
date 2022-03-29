const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

{
  /**
   *On Save Hook, encrypt password
   */
}
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});
userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
const User = model("User", userSchema);
module.exports = User;
