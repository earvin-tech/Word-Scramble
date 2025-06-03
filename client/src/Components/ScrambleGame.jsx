import { useState, useEffect } from "react";

export default function ScrambleGame() {
  const [id, setId] = useState(null);
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchWord = async () => {
    const res = await fetch("https://word-scramble-sla0.onrender.com/api/word");
    const data = await res.json();
    setId(data.id);
    setScrambled(data.scrambled);
    setGuess("");
    setFeedback("");
  };

  const submitGuess = async () => {
    if (!guess.trim()) return;
    const res = await fetch("https://word-scramble-sla0.onrender.com/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, guess }),
    });
    const data = await res.json();
    setFeedback(data.message);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 text-center bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">🔤 Word Scramble</h1>

      <p className="text-xl font-mono mb-4">{scrambled}</p>

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Your guess"
        className="border p-2 rounded w-full mb-2"
      />

      <button onClick={submitGuess} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Submit
      </button>

      {feedback && <p className="mt-4 font-semibold">{feedback}</p>}

      <button
        onClick={fetchWord}
        className="text-sm text-gray-500 underline mt-4"
      >
        Try a new word
      </button>
    </div>
  );
}