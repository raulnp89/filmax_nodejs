const { signUp, login } = require("../Controllers/userControllers");
const verifyToken = require("../Middlewares/auth");
const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
