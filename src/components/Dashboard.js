/* imports */
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Stack, Table } from "react-bootstrap";
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
      <Container
        fluid
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Stack gap={2} vertical className="mb-3 w-25 mx-auto mt-3" style={{ textAlign: "center" }}>
          <Button variant="warning" onClick={() => navigate("/modes")}>
            Play A Game
          </Button>
          <Button variant="warning" disabled>
            Leaderboard
          </Button>
          <Button variant="warning" onClick={() => navigate("/rules")}>
            Rules
          </Button>
        </Stack>

        <h3>Games You've Played</h3>

        <Table className="w-75 mx-auto" striped bordered hover>
          <thead>
            <tr>
              <th>W/L</th>
              <th>Actor</th>
              <th>Category</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {userGames.map((game) => {
              if (!game.actorId) {
                return;
              } else if (game.outcome === "won") {
                return (
                  <tr style={{ fontWeight: "bolder"}}
                  key={`game--${game.id}`}>
                    <td>WON</td>
                    <td>{actorName(game)}</td>
                    <td>{game.category.name}</td>
                    <td>{game.score}</td>
                  </tr>
                );
              } else if (game.outcome === "forfeit") {
                return (
                  <tr key={`game--${game.id}`}>
                    <td>LOST</td>
                    <td>{actorName(game)}</td>
                    <td>{game.category.name}</td>
                    <td>{game.score}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>

        {/* <ul>
          {userGames.map((game) => {
            if (!game.actorId) {
              return;
            } else if (game.outcome === "won") {
              return (
                <li
                  style={{ fontWeight: "bolder", listStyleType: "none" }}
                  key={`game--${game.id}`}
                >
                  WON | {actorName(game)} | {game.category.name} | {game.score}{" "}
                  points
                </li>
              );
            } else if (game.outcome === "forfeit") {
              return (
                <li style={{ listStyleType: "none" }} key={`game--${game.id}`}>
                  LOST | {actorName(game)} | {game.category.name} | {game.score}{" "}
                  points
                </li>
              );
            }
          })}
        </ul> */}
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
