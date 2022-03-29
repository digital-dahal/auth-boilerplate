const Authentication = require("../controller/auth_controller");
const { Router } = require("express");
const passport = require("passport");

const router = Router();
const requireSignIn = passport.authenticate("local", { session: false });

router.post("/signup", Authentication.signup);
router.post("/signin", requireSignIn, Authentication.signin);

module.exports = router;
