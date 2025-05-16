const { v4: uuidv4 } = require("uuid");
const { getRandomWord, scrambleWord, sessions } = require("../utils/wordBank");

exports.getWord = (req, res) => {
  const word = getRandomWord();
  const scrambled = scrambleWord(word);
  const id = uuidv4();

  sessions[id] = word;

  res.json({ id, scrambled });
};

exports.checkGuess = (req, res) => {
  const { id, guess } = req.body;

  if (!sessions[id]) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  const correct = sessions[id].toLowerCase() === guess.toLowerCase();
  res.json({ correct });
};
