/* imports */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getActor,
  getList,
  getLocalLists,
  getUserGames,
  getUserGamesWithCategory,
} from "../managers/APIManager";
import { Category } from "./categories/Category";

/* component */
export const Dashboard = () => {
  const navigate = useNavigate();
//   const [userGames, setUserGames] = useState([]);
//   const [wonGames, setWonGames] = useState([]);
//   const [wonActors, setWonActors] = useState([]);

//   useEffect(() => {
//     getUserGamesWithCategory(
//       JSON.parse(localStorage.getItem("imdb_user")).id
//     ).then(setUserGames);
//   }, []);

//   useEffect(() => {
//     setWonGames(userGames.filter((game) => game.outcome === "won"));
//   }, [userGames]);

//   useEffect(() => {
//     wonGames.map((game) => {
//       const copy = [...wonActors];
//       getActor(game.actorId).then((data) => {
//         copy.push(data);
//         setWonActors(copy);
//       });
//     });
//   }, [wonGames]);

  return (
    <>
      <button type="button" onClick={() => navigate("/modes")}>
        Play A Game
      </button>
      <button>Leaderboard</button>
      <button type="button" onClick={() => navigate("/rules")}>
        Rules
      </button>

      {/* <h3>Games Played</h3>
      <h4>Won</h4>
      {wonGames.map((game) => {
        const gameActor = wonActors.find((actor) => actor.id === game.actorId);
        return (
          <section key={`wonGames--${game.id}`}>
            <h3>
              Category: {game?.category?.name} | Actor: {gameActor?.name} |
              Score: {game.score}
            </h3>
          </section>
        );
      })} */}
    </>
  );
};
