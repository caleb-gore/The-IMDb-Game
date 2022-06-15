import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActor, postGame } from "../../managers/APIManager";

export const Category = ({ category }) => {
  const [actorId, setActorId] = useState("");
 

  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * category?.items?.length + 101)
    console.log(typeof randomIndex);
    setActorId(category?.items?.find(item => parseInt(item.index) === randomIndex).id)
  }, [category]);



  return (
    <>
      {category?.title ? (
        <>
          <h2>
            Category Is: {category.title} ({category.items.length} actors){" "}
          </h2>
          <button
            onClick={() => {
              const gameToSendToAPI = {
                actorId: actorId,
                userId: JSON.parse(localStorage.getItem("imdb_user")).id,
                correctAnswers: 0,
                incorrectAnswers: 0,
                score: 0,
                timestamp: Date.now(),
              };
              Promise.all([postGame(gameToSendToAPI)]).then(navigate("/ready"));
            }}
          >
            Select This Category
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
