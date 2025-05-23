const express = require("express");

const router = express.Router();

const { getWord, checkGuess } = require("../Controllers/gameController");

router.get("/word", getWord);
router.post("/guess", checkGuess);

module.exports = router;