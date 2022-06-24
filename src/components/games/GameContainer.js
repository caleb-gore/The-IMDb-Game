import { useState } from "react";
import { Container } from "react-bootstrap";
import { Actor } from "./Actor";
import { Game } from "./Game";

export const GameContainer = () => {
  const [game, exportGame] = useState({});
  const [actor, exportActor] = useState({});
  const [gameState, importGameState] = useState({});
  const [gameStateChangedOutcome, setGameStateChangedOutcome] = useState({});

  return (
    <>
      <Container className="">
        <Actor
          exportGame={exportGame}
          exportActor={exportActor}
          gameState={gameState}
          setGameState={setGameStateChangedOutcome}
        />
        <Game
          game={game}
          actor={actor}
          exportGameState={importGameState}
          changeActorOutcome={gameStateChangedOutcome}
        />
      </Container>
    </>
  );
};
