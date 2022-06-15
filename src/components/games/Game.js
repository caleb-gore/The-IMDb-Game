import { useEffect, useState } from "react";
import { getActor, getProject, getUserGames } from "../../managers/APIManager";

export const Game = () => {
  const [userGames, setUserGames] = useState([]);
  const [currentGame, setCurrentGame] = useState({});
  const [actor, setActor] = useState({});
  const [knownFors, setKnownFors] = useState([]);

  useEffect(() => {
    getUserGames(JSON.parse(localStorage.getItem("imdb_user")).id).then(
      setUserGames
    );
  }, []);

  useEffect(() => {
    setCurrentGame(userGames[userGames.length - 1]);
  }, [userGames]);

  useEffect(() => {
    if (currentGame) {
      getActor(currentGame.actorId).then(setActor);
    }
  }, [currentGame]);

  useEffect(() => {
    if (actor) {
      Promise.all(
        actor?.knownFor?.map((project) => getProject(project.id))
      ).then(setKnownFors);
    }
  }, [actor]);
  return (
    <>
      <div>{actor.name}</div>
      {
        knownFors.map((project) => {
            if (project.type === "TVSeries") {
                return <div>{project.title} (tv show)</div>
            }  else {
                return <div>{project.title}</div>
            }
        })
      }
    </>
  );
};
