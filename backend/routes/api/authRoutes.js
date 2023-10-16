const { Router } = require("express");
const router = Router();
const { register, login, logout, getNewAccessToken } = require("@/controllers/authController");

router.route("/register").post(register); // this is the same as router.post("/signup", signup)

router.route("/login").post(login); // this is the same as router.post("/login", login)

router.route("/logout").post(logout); // this is the same as router.get("/logout", logout)

router.route("/refresh").get(getNewAccessToken); // this is the same as router.get("/token", getNewAccessToken)

module.exports = router;
