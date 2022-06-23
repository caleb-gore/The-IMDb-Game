import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLosers, getWinners } from "../../managers/APIManager";

export const GameOver = ({ gameState }) => {
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    getWinners().then(setWinners);
    getLosers().then(setLosers);
  }, []);

  const navigate = useNavigate();
 

  if (gameState.outcome === "won" && winners.length > 0 ) {
    return (
      <>
      <img src={winners[Math.floor(Math.random() * winners.length)].gif} />
        <h3>You're a Winner, Harry!</h3>
        <button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        return to dashboard
      </button>
        
      </>
    );
  } else if (gameState.outcome === "forfeit" && losers.length > 0) {
    return (
      <>
        <img src={losers[Math.floor(Math.random() * losers.length)].gif} />
        <h3>better luck next time</h3>
        <button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        return to dashboard
      </button>
      </>
    );
  }
};
