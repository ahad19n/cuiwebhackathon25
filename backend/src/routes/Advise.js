const express = require("express");
const router = express.Router();

const { getAdvice } = require("../controllers/Advise");

router.post("/", getAdvice);

module.exports = router;
