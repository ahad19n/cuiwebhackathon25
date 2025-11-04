const express = require("express");
const router = express.Router();

const { getRates, addRate, editRate, deleteRate } = require("../controllers/Rates");

router.get("/", getRates);
router.post("/", addRate);
router.patch("/:id/:rateId", editRate);
router.delete("/:id/:rateId", deleteRate);

module.exports = router;
