import { useState } from "react";
import { Container } from "react-bootstrap";
import { Hints } from "./Hints";
import { Movies } from "./movies/Movies";
import { Search } from "./Search";

export const GameBoard = ({
  actorObjectFromList,
  gameState,
  updateGameState,
  updateGameOver,
  hintsUnlocked,
  updateHintsUnlocked,
}) => {
  const [userGuess, exportUserGuess] = useState("");
  return (
    <Container className="mt-3 d-flex">
      <Search exportUserGuess={exportUserGuess} />
      {/* <Hints/> */}
      <Movies
        hintsUnlocked={hintsUnlocked}
        userGuess={userGuess}
        actorObjectFromList={actorObjectFromList}
        gameState={gameState}
        updateGameState={updateGameState}
        updateGameOver={updateGameOver}
      />
      {gameState.incorrectAnswers > 1 ? (
        <Hints
          hintsUnlocked={hintsUnlocked}
          updateHintsUnlocked={updateHintsUnlocked}
        />
      ) : (
        ""
      )}
    </Container>
  );
};
