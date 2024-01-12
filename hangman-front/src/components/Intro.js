import React from "react";
import "./game_components/App.css";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();
  const [playerWins, s] = React.useState(() => {
    const wins = localStorage.getItem("WINS");
    return wins === null ? 0 : parseInt(JSON.parse(wins));
  });

  return (
    <center>
      <h1>Welcome to the Hangman game!</h1>
      <h3>Career wins: {playerWins}</h3>
      <h3>Pick a difficulty to start</h3>
      {/* pass difficulty choice to game as state */}
      <button
        type="button"
        onClick={() => navigate("/hangman-game", { state: { difficulty: "E" } })}
        className="btn btn-primary"
      >
        Easy
      </button>
      <button
        type="button"
        onClick={() => navigate("/hangman-game", { state: { difficulty: "H" } })}
        className="btn btn-primary"
      >
        Hard
      </button>
    </center>
  );
}
export default Intro;
