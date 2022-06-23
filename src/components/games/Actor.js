import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActor, getList, getUserGames } from "../../managers/APIManager";

export const Actor = (
  {
    listFromAPI,
    exportActor,
    updateHintsUnlocked,
  } /* { exportGame, exportActor } */
) => {
  const [actor, setActor] = useState(undefined);

  const randomActor = () => {
    const randomIndex = Math.floor(Math.random() * listFromAPI?.items?.length);
    return listFromAPI?.items[randomIndex];
  };

  useEffect(() => {
    setActor(randomActor());
  }, [listFromAPI]);

  useEffect(() => {
    exportActor(actor);
  }, [actor]);
  return (
    <>
      {actor === undefined ? (
        <h1>LOADING...</h1>
      ) : (
        <section className="game__item actor">
          <h3>Actor: {actor.title}</h3>
          <img src={actor.image} height="200rem" alt="actor" />
          <button
            onClick={() => {
              setActor(randomActor());
              updateHintsUnlocked(false);
            }}
          >
            Change Actor
          </button>
        </section>
      )}
    </>
  );
  // const navigate = useNavigate();
  // const [userGames, setUserGames] = useState([]);
  // const [currentGame, setCurrentGame] = useState({});
  // const [actor, setActor] = useState({});
  // const [category, setCategory] = useState({});

  // useEffect(() => {
  //   const currentUserId = JSON.parse(localStorage.getItem("imdb_user")).id;
  //   getUserGames(currentUserId).then(setUserGames);
  // }, []);

  // useEffect(() => {
  //   const gameObject = userGames[userGames.length - 1];
  //   setCurrentGame(gameObject);
  //   exportGame(gameObject);
  // }, [userGames]);

  // useEffect(() => {
  //   if (currentGame) {
  //     Promise.all([
  //       getActor(currentGame.actorId).then((actorObject) => {
  //         setActor(actorObject);
  //         exportActor(actorObject);
  //       }),

  //       getList(currentGame.categoryId).then(setCategory),
  //     ]);
  //   }
  // }, [currentGame]);

  // return (
  //   <section className="game__item actor">
  //     <h3>{actor.name}</h3>
  //     <img src={actor.image} height="200rem" alt="picture of a famous person" />
  //     <h4>{actor.awards}</h4>
  //   </section>
  // );
};
