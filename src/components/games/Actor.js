import { useEffect, useState } from "react";
import { getActor, getUserGames } from "../../managers/APIManager";

export const Actor = ({ exportGame, exportActor }) => {
  const [userGames, setUserGames] = useState([]);
  const [currentGame, setCurrentGame] = useState({});
  const [actor, setActor] = useState({});

  useEffect(() => {
    const currentUserId = JSON.parse(localStorage.getItem("imdb_user")).id;
    getUserGames(currentUserId).then((data) => {
      setUserGames(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    const gameObject = userGames[userGames.length - 1];
    setCurrentGame(gameObject);
    exportGame(gameObject);
  }, [userGames]);

  useEffect(() => {
    if (currentGame) {
      getActor(currentGame.actorId).then((actorObject) => {
        setActor(actorObject)
        exportActor(actorObject)
      });
    }
  }, [currentGame]);

  return (
    <section className="game__item actor">
      <h3>{actor.name}</h3>
      <img src={actor.image} height="200rem" alt="picture of a famous person" />
    </section>
  );
};
