import React from "react";
import "./game_components/App.css";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();
  const [playerWins] = React.useState(() => {
    const wins = localStorage.getItem("WINS");
    return wins === null ? 0 : parseInt(JSON.parse(wins));
  });
  const [wordLength, setWordLength] = React.useState("")
  const [error, setError] = React.useState("");


  function isValid(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n > 1 && n < 11;
}

  function validateLength(event){
    if (event.key === "Enter" || event.key === "click"){
      if(isValid(wordLength)) navigate("/hangman-game", { state: { length: parseInt(wordLength) } });
      setError("Error: enter a numeric between 2 and 10 inclusive!")
      setWordLength("");
      document.querySelector("#intro-in").focus = true;
    }
  }

  return (
    <center>
      <h1>Welcome to the Hangman game!</h1>
      <h3>Career wins: {playerWins}</h3>
      <h3>Enter the number of letters you want in your word to start!</h3>
      <h5>(2 - 10 letters inclusive allowed)</h5>
      {/* pass word length to game as state */}
      <div className="col-md-3 text-warning">{error || ""}</div>
      <input
        id="intro-in"
        autoFocus
        maxLength="2"
        value={wordLength}
        onKeyDown={validateLength}
        onChange={(e) => setWordLength(() => e.target.value)}
      />
      <button type="button" onClick={validateLength} className="btn btn-light">
        Start
      </button>
    </center>
  );
}
export default Intro;
