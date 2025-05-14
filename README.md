# Word Scramble

## What is this App?

A simple word scramble game, players will:
- See a scrambled word.
- Submit a guess.
- Receive feedback whether it is correct or not.

## Core features

Feature            | Description
---                | ---
Word Generation    | Random word selected and scrambled by backend.
Guess Submission   | User submits guess from frontend.
Result Feedback    | Correct/Incorrect shown
Replay             | Option to try new word.

## Application Architecture 

![App architecture](/misc/WordScrambleAA.png)

## API Endpoints

Method | Route     | Description
---    | ---       | ---
GET    | /api/word | Get a random scrambled word.
POST   | /api/guess| Submit a guess with session ID.

## Wireframes

![correct](/misc/correctGuess.png) Correct guess


![incorrect](/misc/incorrectGuess.png) Incorrect guess

## Future features

Feature                     |   Description
---                         |   ---
Time/score tracking         | Time how long it takes user to guess correct, and based on that gives a score, incorrect guesses reduce score.
Difficulty levels           | Scale in difficulty, users complete more levels and unlock more difficult levels
User Accounts               | Allow users to save scores with login
Word hints                  | Allow hints such as word definition and/or reveal letters
Leaderboard with Database   | Using MongoBD track user scores and place them on leader board compared to other users