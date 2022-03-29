const passport = require("passport");
const User = require("../models/user_model");
const JwtStragety = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config/keys");
const LocalStragety = require("passport-local");

const localOptions = { usernameField: "email" };
const locaLogin = new LocalStragety(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }, async (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    await user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
    });
    return done(null, user);
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};
const jwtLogin = new JwtStragety(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(locaLogin);
