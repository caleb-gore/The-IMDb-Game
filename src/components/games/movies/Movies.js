import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActor, getUserGames, postGame } from "../../../managers/APIManager";
import { HTMLIfGuessed } from "./HTMLIfGuessed";
import { HTMLIfNotGuessed } from "./HTMLIfNotGuessed";

export const Movies = ({
  userGuess,
  actorObjectFromList,
  gameState,
  updateGameState,
  hintsUnlocked,
  updateGameOver
}) => {
  const navigate = useNavigate();
  const [knownForArray, setKnownForArray] = useState([]);
  const [correctlyGuessed, updateCorrectlyGuessed] = useState([]);
  const [hintStatus, updateHintStatus] = useState([]);

  /* display movies */
  const movieHTML = () => {
    return knownForArray.map((project) => {
      if (correctlyGuessed[knownForArray.indexOf(project)]) {
        return (
          <section key={`project--${project.id}`}>
            <HTMLIfGuessed project={project} />
          </section>
        );
      } else {
        return (
          <section key={`project--${project.id}`}>
            <HTMLIfNotGuessed
              project={project}
              hintStatus={hintStatus}
              hintsUnlocked={hintsUnlocked}
              knownForArray={knownForArray}
              updateHintStatus={updateHintStatus}
            />
          </section>
        );
      }
    });
  };

  useEffect(() => {
    updateCorrectlyGuessed(
      knownForArray.map((project) => {
        return false;
      })
    );

    updateHintStatus(
      knownForArray.map((project) => {
        return false;
      })
    );
  }, [knownForArray]);

  /* use actorObjectFromList to find the actor object from public API, save the knownFor section to state */
  useEffect(() => {
    if (actorObjectFromList !== undefined) {
      getActor(actorObjectFromList?.id).then((data) => {
        setKnownForArray(data.knownFor);
      });
    }
  }, [actorObjectFromList]);

  useEffect(() => {
    if (correctlyGuessed.length) {
      const stillNotGuessed = correctlyGuessed.filter(
        (index) => index === false
      );
      console.log(stillNotGuessed);
      if (stillNotGuessed.length === 0) {
       
        const copy = { ...gameState };
        copy.outcome = "won";
        updateGameState(copy)
        postGame(copy).then(updateGameOver(true));
      }
    }
  }, [correctlyGuessed]);

  /* find the title in knownForArray that matches the guess
  if the title matches, change corresponding value in correctlyGuessed to true
  update points and correct answers in game state
  
  if the title does not match, update score and incorrect answers in game state*/
  useEffect(() => {
    const correctAnswer = knownForArray.find(
      (project) => project.title.toLowerCase() === userGuess.toLowerCase()
    );

    if (correctAnswer !== undefined) {
      const copyCorrectlyGuessed = [...correctlyGuessed];
      copyCorrectlyGuessed[knownForArray.indexOf(correctAnswer)] = true;
      updateCorrectlyGuessed(copyCorrectlyGuessed);

      const copyGameState = { ...gameState };
      copyGameState.score += 10;
      copyGameState.correctAnswers++;
      updateGameState(copyGameState);
    } else if (userGuess !== "") {
      const copyGameState = { ...gameState };
      copyGameState.score -= 2;
      copyGameState.incorrectAnswers++;
      updateGameState(copyGameState);
    }
  }, [userGuess]);

  return <>{movieHTML()}</>;
};
