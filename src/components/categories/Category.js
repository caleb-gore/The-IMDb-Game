import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserGames, postGame } from "../../managers/APIManager";

export const Category = (
  {
    clearChosenCategory,
    chosenCategory,
  } /* { category, categoryId, isSelected } */
) => {
  const navigate = useNavigate();

  return (
    <>
      {/* onclick, return to categories */}
      <button
        onClick={() => {
          clearChosenCategory(null);
        }}
      >
        go back
      </button>
      <h1>Category Is: {chosenCategory.name} </h1>

      {/* create new game object, post object to API, navigate to game component */}
      <button
        onClick={() => {
          const newGameObject = {
            categoryId: chosenCategory.id,
            userId: JSON.parse(localStorage.getItem("imdb_user")).id,
            timestamp: Date.now(),
          };
          postGame(newGameObject).then(navigate("/game"));
        }}
      >
        Let's Play!
      </button>
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
