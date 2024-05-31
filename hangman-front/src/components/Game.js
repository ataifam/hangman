import React, { useEffect, useCallback } from "react";
import "./game_components/App.css";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Man from "./game_components/Man";
import Info from "./game_components/Info";
import Guess from "./game_components/Guess";

function Game() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [gameInfo, setGameInfo] = React.useState({
    livesRemaining: 6,
    gameWord: "",
    correctGuesses: 0,
    pastGuesses: [],
    wordDisplay: "",
  });


  /* prevent update function from being recreated upon every component re-rendering
   * so child component can use the function as a dependency in useEffect
   */
  const memoizedSetGameInfo = useCallback(
    (data) => {
      setGameInfo(prev => ({
          ...prev,
          wordDisplay: (prev.wordDisplay = "_ "
          .repeat(data.length)
          .substring(0, data.length * 2 - 1)),
      }));
    },
    [],
  );

  /* once difficulty choice has registered from intro,
   * call the API for a word and make it the game word */
  useEffect(() => {
    if(state == null || state.length == null){
      return navigate("/hangman-intro");
    }
    fetch("https://www.ataifou1projects.com/hang/" + state.length)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        setGameInfo(prev => ({
          ...prev,
          gameWord: (prev.gameWord = data.word),
          ...prev,
        }));
      })
      .catch((error) => {
        console.log(error);
        return navigate("/hangman-intro");
      });
  }, [state, navigate]);

  try {
    /* register a hang man body part on the page and decrease livesRemaining */
    function loseLife() {
      document.querySelector(".life" + gameInfo.livesRemaining).style.display =
        "block";
      setGameInfo({
        ...gameInfo,
        livesRemaining: gameInfo.livesRemaining--,
        ...gameInfo,
      });
      checkGameOver();
    }

    /* increment correctGuesses */
    function getPoint() {
      setGameInfo({
        ...gameInfo,
        correctGuesses: gameInfo.correctGuesses++,
        ...gameInfo,
      });
      checkGameOver();
    }

    /* we cannot modify the state of the original array,
     * so create a new one w/ same vals including current guess */
    function updateGuessed(letter) {
      let auxArray = gameInfo.pastGuesses.slice();
      auxArray.push(letter);
      setGameInfo({
        ...gameInfo,
        pastGuesses: (gameInfo.pastGuesses = auxArray),
        ...gameInfo,
      });
    }

    /* use string concatenation to include current letter at position i;
     * index i is scaled by 2 to correspond with spaces in word display */
    function updateDisplayWord(i, letter) {
      /* use string concatenation to include current letter at position i */
      /* index i is scaled by 2 to correspond with spaces in word display */
      setGameInfo({
        ...gameInfo,
        wordDisplay: (gameInfo.wordDisplay =
          gameInfo.wordDisplay.substring(0, i * 2) +
          letter +
          gameInfo.wordDisplay.substring(i * 2 + 1)),
      });
    }

    /* after each answer submitted we continuously check the status of the game;
     * if we have 0 lives remaining, we lost; otherwise, if our correct guesses
     * == the length of gameWord, we won */
    function checkGameOver() {
      /* before navigating to endgame, we pass the game word, lives remaining,
       * and outcome as state */
      if (gameInfo.livesRemaining === 0) {
        navigate("/hangman-endgame", {
          state: {
            word: gameInfo.gameWord,
            lives: gameInfo.livesRemaining,
            outcome: "Lost",
          },
        });
      } else if (gameInfo.correctGuesses === gameInfo.gameWord.length) {
        let wins = localStorage.getItem("WINS");
        localStorage.setItem("WINS", (wins !== null ? parseInt(wins) : 0) + 1);
        navigate("/hangman-endgame", {
          state: {
            word: gameInfo.gameWord,
            lives: gameInfo.livesRemaining,
            outcome: "Won",
          },
        });
      }
    }

    return (
      <>
        <Man />
        <center>
          <Info gameInfo={gameInfo} memoizedSetGameInfo={memoizedSetGameInfo} />
          <Guess
            gameInfo={gameInfo}
            updateGuessed={updateGuessed}
            updateDisplayWord={updateDisplayWord}
            getPoint={getPoint}
            loseLife={loseLife}
            error={""}
          />
        </center>
      </>
    );
  } catch (e) {
    console.log(e);
    return <Navigate to="/hangman-intro" />;
  }
}
export default Game;
