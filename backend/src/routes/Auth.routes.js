const express = require("express");
const router = express.Router();

const Auth = require("../controllers/Auth.controller");

router.post("/login", Auth.login);
router.post("/register", Auth.register);

module.exports = router;
