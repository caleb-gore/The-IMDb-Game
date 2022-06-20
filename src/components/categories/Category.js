import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActor, getUserGames, postGame } from "../../managers/APIManager";

export const Category = ({ category, categoryId, isSelected }) => {
  const [actorId, setActorId] = useState("");
  const [actors, setActors] = useState([]);

  const navigate = useNavigate();

  const randomActorId = () => {
    const randomIndex = Math.floor(Math.random() * actors.length);
    return actors[randomIndex].id;
  };

  useEffect(() => {
    category.items ? setActors(category.items) : setActors([]);
  }, [category]);
  return (
    <>
      {isSelected ? (
        <>
          <h2>
            Category Is: {category.title} ({actors.length} actors){" "}
          </h2>
          <button
            onClick={() => {
              const gameToSendToAPI = {
                actorId: randomActorId(),
                categoryId: categoryId,
                userId: JSON.parse(localStorage.getItem("imdb_user")).id,
                correctAnswers: 0,
                incorrectAnswers: 0,
                score: 0,
                timestamp: Date.now(),
                outcome: "",
              };
              Promise.all([
                (postGame(gameToSendToAPI),
                getUserGames(gameToSendToAPI.userId)),
              ]).then(navigate("/game"));
            }}
          >
            Lets Play!
          </button>
        </>
      ) : (
        ""
      )}
      {/* <div>
        <h3>{category?.items?.length}</h3>
        <h3>
          {
            category?.items[Math.floor(Math.random() * category?.items?.length)]
              ?.title
          }
        </h3>

      </div> */}
    </>
  );
};
