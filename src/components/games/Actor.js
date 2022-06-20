import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getActor,
  getList,
  getUserGames,
  postGame,
} from "../../managers/APIManager";

export const Actor = ({ exportGame, exportActor, gameState, setGameState }) => {
  const navigate = useNavigate();
  const [userGames, setUserGames] = useState([]);
  const [currentGame, setCurrentGame] = useState({});
  const [actor, setActor] = useState({});
  const [category, setCategory] = useState({});

  const changeActor = () => {
    const copy = { ...gameState };
    copy.outcome = "forfeit";
    setGameState(copy);

    const newGame = {
      actorId:
        category?.items[Math.floor(Math.random() * category.items.length)].id,
      categoryId: currentGame.categoryId,
      userId: currentGame.userId,
      correctAnswers: 0,
      incorrectAnswers: 0,
      score: 0,
      timestamp: Date.now(),
      outcome: "",
    };

    postGame(newGame).then(getUserGames(newGame.userId)).then(setUserGames);
  };

  useEffect(() => {
    const currentUserId = JSON.parse(localStorage.getItem("imdb_user")).id;
    getUserGames(currentUserId).then(setUserGames);
  }, []);

  useEffect(() => {
    const gameObject = userGames[userGames.length - 1];
    setCurrentGame(gameObject);
    exportGame(gameObject);
  }, [userGames]);

  useEffect(() => {
    if (currentGame) {
      Promise.all([
        getActor(currentGame.actorId).then((actorObject) => {
          setActor(actorObject);
          exportActor(actorObject);
        }),

        getList(currentGame.categoryId).then(setCategory),
      ]);
    }
  }, [currentGame]);

  return (
    <section className="game__item actor">
      <h3>{actor.name}</h3>
      <img src={actor.image} height="200rem" alt="picture of a famous person" />
      <h4>{actor.awards}</h4>
      <button
        onClick={() => {
          changeActor();
        }}
      >
        Change Actor
      </button>
    </section>
  );
};
