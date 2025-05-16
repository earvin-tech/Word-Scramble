const words = ["space", "planet", "astronaut", "galaxy", "mars", "orbit", "cosmic"];
const sessions = {};

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function scrambleWord(word) {
  return word.split("").sort(() => 0.5 - Math.random()).join("");
}

module.exports = {
  getRandomWord,
  scrambleWord,
  sessions,
};
