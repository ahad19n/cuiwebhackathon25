const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/Auth");
const auth = require("../middlewares/Auth");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", auth(), AuthController.logout);

module.exports = router;
