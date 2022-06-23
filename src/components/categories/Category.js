import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getList, getUserGames, postGame } from "../../managers/APIManager";
import { Game } from "../games/Game";

export const Category = (
  {
    clearChosenCategory,
    chosenCategory,
  } /* { category, categoryId, isSelected } */
) => {
  const [gameInProgress, updateGameInProgress] = useState(false);
  const [gameState, setGameState] = useState(undefined);
  const [listFromAPI, setListFromAPI] = useState(undefined);

  return (
    <>
      {gameInProgress ? (
        <Game
          gameState={gameState}
          setGameState={setGameState}
          listFromAPI={listFromAPI}
          chosenCategory={chosenCategory}
        />
      ) : (
        <>
          {/* onclick, return to categories */}
          <button
            onClick={() => {
              clearChosenCategory(undefined);
            }}
          >
            go back
          </button>
          <h1>Category Is: {chosenCategory.name} </h1>

          {/* create new game object, save it to gameState, get list for current category, initiate game play */}
          <button
            onClick={() => {
              const newGameObject = {
                score: 0,
                categoryId: chosenCategory.id,
                userId: JSON.parse(localStorage.getItem("imdb_user")).id,
                timestamp: Date.now(),
                correctAnswers: 0,
                incorrectAnswers: 0,
              };
              setGameState(newGameObject);
              getList(chosenCategory.id)
                .then(setListFromAPI)
                .then(updateGameInProgress(true));
            }}
          >
            Let's Play!
          </button>
        </>
      )}
    </>
  );

  // const [actors, setActors] = useState([]);

  // const navigate = useNavigate();

  // const randomActorId = () => {
  //   const randomIndex = Math.floor(Math.random() * actors.length);
  //   return actors[randomIndex].id;
  // };

  // useEffect(() => {
  //   category.items ? setActors(category.items) : setActors([]);
  // }, [category]);
  // return (
  //   <>
  //     {isSelected ? (
  //       <>
  //         <h2>
  //           Category Is: {category.title} ({actors.length} actors){" "}
  //         </h2>
  //         <button
  //           onClick={() => {
  //             const gameToSendToAPI = {
  //               actorId: randomActorId(),
  //               categoryId: categoryId,
  //               userId: JSON.parse(localStorage.getItem("imdb_user")).id,
  //               correctAnswers: 0,
  //               incorrectAnswers: 0,
  //               score: 0,
  //               timestamp: Date.now(),
  //               outcome: "",
  //             };
  //             Promise.all([
  //               (postGame(gameToSendToAPI),
  //               getUserGames(gameToSendToAPI.userId)),
  //             ]).then(navigate("/game"));
  //           }}
  //         >
  //           Lets Play!
  //         </button>
  //       </>
  //     ) : (
  //       ""
  //     )}
  //   </>
  // );
};
