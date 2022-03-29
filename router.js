const AuthRoute = require("./routes/auth_route");
const passport = require("passport");
const passportService = require("./services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function (app) {
  app.get("/", requireAuth, (req, res) => {
    res.send({
      message: "Welcome to the API",
    });
  });
  app.use("/api/v1/auth", AuthRoute);
};
