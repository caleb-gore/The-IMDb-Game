import { useState } from "react";
import { Actor } from "./Actor";
import { Game } from "./Game";

export const GameContainer = () => {
    const [game, exportGame] = useState({})
    const [actor, exportActor] = useState({})
    return (
    <>
      <article className="game__container">
        <Actor exportGame={exportGame} exportActor={exportActor}/>
        <Game game={game} actor={actor}/>
      </article>
    </>
  );
};
