import { useState } from "react";
import { Hints } from "./Hints";
import { Movies } from "./movies/Movies";
import { Search } from "./Search";

export const GameBoard = ({ actorObjectFromList, gameState, updateGameState, updateGameOver, hintsUnlocked, updateHintsUnlocked }) => {
  const [userGuess, exportUserGuess] = useState("");
  return (
    <section className="game__item game">
      <Search exportUserGuess={exportUserGuess} />
      {/* <Hints/> */}
      <Movies hintsUnlocked={hintsUnlocked} userGuess={userGuess} actorObjectFromList={actorObjectFromList} gameState={gameState} updateGameState={updateGameState} updateGameOver={updateGameOver}/>
      <Hints hintsUnlocked={hintsUnlocked} updateHintsUnlocked={updateHintsUnlocked}/>
    </section>
  );
};
