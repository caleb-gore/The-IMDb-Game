/* imports */
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getActor,
  getCategories,
  getList,
  getLocalLists,
  getUserGames,
  getUserGamesWithCategory,
} from "../managers/APIManager";
import { Category } from "./categories/Category";

/* component */
export const Dashboard = () => {
  const navigate = useNavigate();
  const [userGames, setUserGames] = useState([]);
  const [actors, setActors] = useState([]);
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

  //   async function actorName(actorId) {
  //     const data = await getActor(actorId)
  //   }

  // const actorName = () => {
  //     const copy = {...actor}
  //     setActor(undefined)
  //     console.log(copy.name);
  //     return copy.name
  // }

  const actorName = (gameObj) => {
    if (actors.length > 0 && gameObj.actorId) {
      const gameActor = actors.find(
        (actorObj) => actorObj.id === gameObj.actorId
      );
      return gameActor.name;
    }
  };

  useEffect(() => {
    Promise.all(
      userGames.map((game) => {
        return getActor(game.actorId);
      })
    ).then(setActors);
  }, [userGames]);

  useEffect(() => {
    getUserGames(JSON.parse(localStorage.getItem("imdb_user")).id).then(
      setUserGames
    );
  }, []);
  return (
    <>
    <Container fluid style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
    <ButtonGroup vertical className="mb-3" style={{textAlign: "center"}}>
      <Button variant="warning" onClick={() => navigate("/modes")}>
        Play A Game
      </Button>
      <Button variant="light" disabled>Leaderboard</Button>
      <Button variant="warning" onClick={() => navigate("/rules")}>
        Rules
      </Button>
    </ButtonGroup>


      <h3>Games You've Played</h3>
      <ul>
        {userGames.map((game) => {
            if (!game.actorId) {
                return;
            } else if (game.outcome === "won") {
                return (
                    <li
                    style={{fontWeight: "bolder", listStyleType: "none" }}
                    key={`game--${game.id}`}
                    >
                WON | {actorName(game)} | {game.category.name} | {game.score} points
              </li>
            );
        } else if (game.outcome === "forfeit") {
            return (
                <li
                style={{ listStyleType: "none" }}
                key={`game--${game.id}`}
                >
                LOST | {actorName(game)} | {game.category.name} | {game.score} points
              </li>
            );
        }
    })}
      </ul>
      </Container>

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
