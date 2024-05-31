import React, { useEffect } from "react";
import "./game_components/App.css";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Man from "./game_components/Man";

export default function EndGame() {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* once state.lives registers from Game view, use its value to show the
   * same body parts of the hangman on game view. */
  useEffect(() => {
    if(state == null || state.lives == null){
      return navigate("/hangman-intro");
    }
    for (let w = 6; w > state.lives; w--) {
      document.querySelector(".life" + w).style.display = "block";
    }
  }, [state, navigate]);

  try {
    /* if we navigate to game page without first playing the game, return
     * to intro page immediately */
    const { word, outcome } = state;
    
    return (
      <center>
        <Man />
        <h1>You {outcome}!</h1>
        <h2>The word was: {word}</h2>
        <p>Try Again?</p>
        <button
          type="button"
          onClick={() => navigate("/hangman-intro")}
          className="btn btn-primary"
        >
          New Game
        </button>
      </center>
    );
  } catch (e) {
    console.log(e);
    return <Navigate to="/hangman-intro" />;
  }
}
