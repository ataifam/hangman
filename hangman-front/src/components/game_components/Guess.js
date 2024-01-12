import React from "react";
import "./App.css";

function Guess({
  gameInfo,
  updateGuessed,
  updateDisplayWord,
  getPoint,
  loseLife,
}) {
  const [letterGuess, setLetterGuess] = React.useState("");
  const [error, setError] = React.useState("");

  {
    /* only check guess if enter key or button was clicked
     * check for invalid user input (no input, invalid character, or a past guess)
     */
  }
  function validateInput(event) {
    setLetterGuess(() => letterGuess.toLowerCase());
    if (event.key === "Enter" || event.type === "click") {
      setError("");
      if (
        letterGuess.length > 0 &&
        letterGuess.toUpperCase() !== letterGuess.toLowerCase() &&
        gameInfo.pastGuesses.indexOf(letterGuess) === -1
      ) {
        return true;
      }
      setError("Error: enter a single, unused alphabet letter!");
    }
    return false;
  }

  {
    /* answer is only checked if validation passes */
  }
  function checkAnswer(event) {
    if (validateInput(event)) {
      updateGuessed(letterGuess);
      let guessMatch = false;
      for (let i = 0; i < gameInfo.gameWord.length; i++) {
        if (gameInfo.gameWord.charAt(i) === letterGuess) {
          {
            /* set to true to indicate the letter exists for a first time in the word */
          }
          guessMatch = true;
          updateDisplayWord(i, letterGuess);
          getPoint();
        }
      }
      {
        /* if the letter does not exist at all in the word, decrease a life */
      }
      if (!guessMatch) {
        loseLife();
      }
    }
    document.querySelector("#in").focus = true;
    setLetterGuess(() => "");
  }

  return (
    <div id="game">
      <div className="col-md-3 text-warning">{error || ""}</div>
      <input
        id="in"
        autoFocus
        maxLength="1"
        value={letterGuess}
        onKeyDown={checkAnswer}
        onChange={(e) => setLetterGuess(() => e.target.value)}
      />
      <button type="button" onClick={checkAnswer} className="btn btn-light">
        Enter
      </button>
    </div>
  );
}
export default Guess;
