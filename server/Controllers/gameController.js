const { v4: uuidv4 } = require("uuid");
const { getRandomWord, scrambleWord, sessions } = require("../Utils/wordBank");

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

  if (typeof guess !== 'string' || guess.trim() === '') {
    return response.status(400).json({ error: "Missing or invalid guess" });
  }

  const correct = sessions[id].toLowerCase() === guess.toLowerCase();
    delete sessions[id];
    response.json({
    correct,
    message: correct ? "Correct!" : "Incorrect!"
});

};
