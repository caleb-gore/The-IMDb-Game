import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
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
      <Container className="d-flex flex-column w-50 justify-content-center align-items-center mx-auto">
      <img height="200rem" src={winners[Math.floor(Math.random() * winners.length)].gif} />
        <h3>You're a Winner, Harry!</h3>
        <Button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        return to dashboard
      </Button>
        
      </Container>
    );
  } else if (gameState.outcome === "forfeit" && losers.length > 0) {
    return (
      <Container className="d-flex flex-column w-50 justify-content-center align-items-center mx-auto">
        <img height="400rem" src={losers[Math.floor(Math.random() * losers.length)].gif} />
        <h3>better luck next time</h3>
        <Button
        variant="warning"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        return to dashboard
      </Button>
      </Container>
    );
  }
};
