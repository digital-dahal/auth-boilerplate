const User = require("../models/user_model");
const keys = require("../config/keys");
const jwt = require("jwt-simple");
function generateToken(id) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: id, iat: timeStamp }, keys.secret);
}

exports.signup = async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  User.findOne({ email }, async (err, user) => {
    if (err) return next(err);
    if (user) {
      return res.status(422).send({ error: "Email is in use" });
    }
    const newUser = await User.create({ email, password });
    if (newUser.message) {
      return res.status(422).send({ error: newUser.message });
    }
    console.log(newUser._id);
    const token = generateToken(newUser._id);
    res.json({
      token,
    });
  });
};

exports.signin = async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  // passport middleware has already been called
  // passport stragety has email & password
  // access to req.user from passport
  
  const token = generateToken(req.user._id);
  res.json({
    token,
  });
};
