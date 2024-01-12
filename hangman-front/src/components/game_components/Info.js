import React, { useEffect } from "react";
import "./App.css";

function Info({ gameInfo, setGameInfo }) {
  {
    /* after gameWord gets set, update the value of the display word
     * using the gameWord's length */
  }
  useEffect(() => {
    setGameInfo({
      ...gameInfo,
      wordDisplay: (gameInfo.wordDisplay = "_ "
        .repeat(gameInfo.gameWord.length)
        .substring(0, gameInfo.gameWord.length * 2 - 1)),
    });
  }, [gameInfo.gameWord]);

  return (
    <div id="gameinfodiv">
      <p>lives remaining: {gameInfo.livesRemaining}</p>
      <p>
        past guesses:
        {gameInfo.pastGuesses.length !== 0 ? gameInfo.pastGuesses : " none"}
      </p>
      <h1>{gameInfo.wordDisplay}</h1>
    </div>
  );
}
export default Info;
