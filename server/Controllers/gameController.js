const { v4: uuidv4 } = require("uuid");
const { getRandomWord, scrambleWord, sessions } = require("../utils/wordBank");

exports.getWord = (request, response) => {
  const word = getRandomWord();
  const scrambled = scrambleWord(word);
  const id = uuidv4();

  sessions[id] = word;

  response.json({ id, scrambled });
};

exports.checkGuess = (request, response) => {
  const { id, guess } = request.body;

  if (!sessions[id]) {
    return response.status(400).json({ error: "Invalid session ID" });
  }

  const correct = sessions[id].toLowerCase() === guess.toLowerCase();
    response.json({
    correct,
    message: correct ? "Correct!" : "Incorrect!"
});

};
