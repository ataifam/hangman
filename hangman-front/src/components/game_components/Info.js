import React, { useEffect } from "react";
import "./App.css";

function Info({ gameInfo, memoizedSetGameInfo }) {
  
  /* after gameWord gets set, update the value of the display word
  * using the gameWord's length */
  useEffect(() => {
    memoizedSetGameInfo(gameInfo.gameWord);
  }, [gameInfo.gameWord, memoizedSetGameInfo]);

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
