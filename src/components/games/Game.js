import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProject } from "../../managers/APIManager"; //fetch movie objects from API
import { Hints } from "./Hints";

export const Game = ({ game, actor, exportGameState, changeActorOutcome }) => {
  const navigate = useNavigate();
  const [guess, updateGuess] = useState(""); // most recent guess submitted
  const [searchTerm, updateSearchTerm] = useState(""); // text in the search box
  const [knownFor, updateKnownFor] = useState([]); // array of "known For" objects from actor object
  const [knownForDetails, setKnownForDetails] = useState([]); // array of detailed "known For" objects from API
  const [guessedStatus, updateGuessedStatus] = useState([
    false,
    false,
    false,
    false,
  ]); // array holding the isGuessed state of movies
  const [hintStatus, updateHintStatus] = useState([false, false, false, false]);
  const [gameState, updateGameState] = useState({}); // current state of game object
  const [previousGuesses, updatePreviousGuesses] = useState([]); // array of submitted guesses
  const [hintsEnabled, setHintsEnabled] = useState(false);

  const setUnguessedImage = (projectIndex) => {
    if (hintStatus[projectIndex]) {
      const copy = { ...gameState };
      return (
        <div>
          <button
            onClick={() => {
              window.alert(knownForDetails[projectIndex].plot);
              copy.score -= 2;
              updateGameState(copy);
            }}
          >
            Plot
          </button>

          {knownForDetails[projectIndex].awards !== "" ? (
            <button
              onClick={() => {
                window.alert(knownForDetails[projectIndex].awards);
                copy.score -= 2;
                updateGameState(copy);
              }}
            >
              Awards
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              window.alert(knownForDetails[projectIndex].stars);
              copy.score -= 2;
              updateGameState(copy);
            }}
          >
            Stars
          </button>
          {knownForDetails[projectIndex].directors !== "" ? (
            <button
              onClick={() => {
                window.alert(knownForDetails[projectIndex].directors);
                copy.score -= 2;
                updateGameState(copy);
              }}
            >
              Directors
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              window.alert(knownForDetails[projectIndex].genres);
              copy.score -= 2;
              updateGameState(copy);
            }}
          >
            Genres
          </button>
          <button
            onClick={() => {
              window.alert(knownForDetails[projectIndex].keywords);
              copy.score -= 2;
              updateGameState(copy);
            }}
          >
            Keywords
          </button>
        </div>
      );
    } else {
      return (
        <img
          src="https://previews.123rf.com/images/mdesignstudio/mdesignstudio1506/mdesignstudio150600029/41031151-colorful-poster-with-question-mark-poster-concept.jpg"
          height="200rem"
        />
      );
    }
  };

  const hintCheck = (projectIndex) => {
    if (hintsEnabled) {
      return (
        <button
          onClick={() => {
            const copy = [...hintStatus];
            copy[projectIndex] = true;
            updateHintStatus(copy);
          }}
        >
          ?
        </button>
      );
    }
  };

  /* check if project is TV Series */
  const typeCheck = (projectId) => {
    const currentProject = knownForDetails?.find(
      (project) => project.id === projectId
    );
    if (currentProject?.type === "TVSeries") {
      return <div>TV SERIES</div>;
    } else if (currentProject?.errorMessage === "VideoGame is not valid") {
      return <div>VIDEO GAME</div>;
    }
  };

  /* hide titles before they are guessed */
  const questionMarkMaker = (string) => {
    let newString = "";
    for (let i = 0; i < string.length; i++) {
      const code = string.charCodeAt(i);
      if (
        !(code > 47 && code < 58) &&
        !(code > 64 && code < 91) &&
        !(code > 96 && code < 123)
      ) {
        newString += string[i];
      } else {
        newString += "-";
      }
    }
    return newString;
  };

  /* set knownFor based on actor */
  useEffect(() => {
    updateKnownFor(actor.knownFor);
  }, [actor]);

  /* set knownForDetails based on knownFor */
  useEffect(() => {
    const projectPromises = knownFor?.map((project) => {
      return getProject(project.id);
    });
    Promise.all(projectPromises).then(setKnownForDetails);
  }, [knownFor]);

  /* set guessedStatus based on guess */
  useEffect(() => {
    const correctProject = knownFor.find(
      (project) => project.title.toLowerCase() === guess.toLowerCase()
    );

    const correctProjectIndex = knownFor.indexOf(correctProject);
    if (correctProject && !guessedStatus[correctProjectIndex]) {
      const guessCopy = [...guessedStatus];
      guessCopy[correctProjectIndex] = true;
      updateGuessedStatus(guessCopy);

      const gameCopy = { ...gameState };
      gameCopy.correctAnswers++;
      gameCopy.incorrectAnswers < 2
        ? (gameCopy.score += 15)
        : (gameCopy.score += 10);
      updateGameState(gameCopy);

      const previousGuessesCopy = [...previousGuesses];
      previousGuessesCopy.push(guess.toLowerCase());
      updatePreviousGuesses(previousGuessesCopy);
    } else {
      const gameCopy = { ...gameState };
      gameCopy.incorrectAnswers++;
      if (hintsEnabled) {
        gameCopy.score -= 1;
      }
      updateGameState(gameCopy);

      const previousGuessesCopy = [...previousGuesses];
      previousGuessesCopy.push(guess.toLowerCase());
      updatePreviousGuesses(previousGuessesCopy);
    }
  }, [guess]);

  useEffect(() => {}, [gameState]);
  useEffect(() => {
    updateGameState(game);
  }, [game]);

  useEffect(() => {
    if (searchTerm !== "" && previousGuesses.indexOf(searchTerm) > -1) {
      window.alert("You already guessed this");
    }
  }, [searchTerm]);

  useEffect(() => {
    const variable = guessedStatus.filter((index) => index === false);
    console.log(variable.length);
    if (variable.length === 0) {
      window.alert("You Won!!!");
      navigate("/dashboard");
    }
  }, [guessedStatus]);

  useEffect(() => {
    exportGameState(gameState);
  }, [gameState]);

  useEffect(() => {
    updateGameState(changeActorOutcome);
  }, [changeActorOutcome]);
  return (
    <>
      <section className="game__item game">
        <input
          value={searchTerm}
          onChange={(e) => {
            updateSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateGuess(searchTerm);
              updateSearchTerm("");
            }
          }}
        />
        <button
          onClick={() => {
            updateGuess(searchTerm);
            updateSearchTerm("");
          }}
        >
          GUESS
        </button>
        <>
          {gameState?.incorrectAnswers > 1 ? <div>Years Unlocked</div> : <></>}
        </>
        <div>Score: {gameState?.score}</div>
        <div>
          {gameState?.incorrectAnswers ? (
            <div>❌: {gameState?.incorrectAnswers}</div>
          ) : (
            ""
          )}
        </div>
        <Hints
          game={gameState}
          setHintsEnabled={setHintsEnabled}
          hintsEnabled={hintsEnabled}
        />
        {knownFor?.map((project) => {
          if (guessedStatus[knownFor.indexOf(project)]) {
            return (
              <section key={`project--${project.id}`}>
                {typeCheck(project.id)}
                <img src={project.image} height="200rem" />
                <h3>{project.title}</h3>
                <h4>{project.year}</h4>
              </section>
            );
          } else if (gameState.incorrectAnswers < 2) {
            return (
              <section key={`project--${project.id}`}>
                {typeCheck(project.id)}
                <img
                  src="https://previews.123rf.com/images/mdesignstudio/mdesignstudio1506/mdesignstudio150600029/41031151-colorful-poster-with-question-mark-poster-concept.jpg"
                  height="200rem"
                />
                <h3>{questionMarkMaker(project.title)}</h3>
              </section>
            );
          } else {
            return (
              <section key={`project--${project.id}`}>
                {typeCheck(project.id)}
                {hintCheck(knownFor.indexOf(project))}
                {setUnguessedImage(knownFor.indexOf(project))}
                <h3>{questionMarkMaker(project.title)}</h3>
                <h4>{project.year}</h4>
              </section>
            );
          }
        })}
        <section>
          <button
            onClick={() => {
              const unguessed = knownFor.filter(
                (project) => !guessedStatus[knownFor.indexOf(project)]
              );
              window.alert(
                `You Missed: ${unguessed.map((project) => project.title)}`
              );
              navigate("/dashboard");
            }}
          >
            Give Up?
          </button>
        </section>
      </section>
    </>
  );

  /* const [userGames, setUserGames] = useState([]);
  const [currentGame, setCurrentGame] = useState({});
  const [actor, setActor] = useState({});
  const [knownFors, setKnownFors] = useState([]);
  const [placeholders, setPlaceholders] =useState([])
  const [searchTerms, updateSearchTerms] = useState("");
  const questionMarkMaker = (string) => {
    let newString = "";
    for (let i = 0; i < string.length; i++) {
      const code = string.charCodeAt(i);
      if (
        !(code > 47 && code < 58) &&
        !(code > 64 && code < 91) &&
        !(code > 96 && code < 123)
      ) {
        newString += string[i];
      } else {
        newString += "-";
      }
    }
    return newString;
  };

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

  useEffect(() => {
    const placeholderJSX = knownFors.map((project) => {
      if (project.type === "TVSeries") {
        console.log(questionMarkMaker(project.title));
        console.log(questionMarkMaker(project.year));
        return (
          <div>
            <p>(tv show)</p>
            <img
              src="https://i.pinimg.com/originals/96/8d/3d/968d3dfb9a1ee72e83ddcec2bc64eb82.jpg"
              height="200rem"
            />
            <h3>{questionMarkMaker(project.title)}</h3>
            <p>{questionMarkMaker(project.year)}</p>
          </div>
        );
      } else {
        console.log(questionMarkMaker(project.title));
        console.log(questionMarkMaker(project.year));
        return (
          <div>
            <img
              src="https://i.pinimg.com/originals/96/8d/3d/968d3dfb9a1ee72e83ddcec2bc64eb82.jpg"
              height="200rem"
            />
            <h3>{questionMarkMaker(project.title)}</h3>
            <p>{questionMarkMaker(project.year)}</p>
          </div>
        );
      }
    });
  }, [knownFors]);

  return (
    <>
      <article>
        <input
          onChange={(e) => {
            updateSearchTerms(e.target.value);
          }}
        ></input>
        <button>Guess</button>
        <section>
          <h3>{actor.name}</h3>
          <img src={actor.image} height="200rem" />
        </section>
        <section>
          {knownFors.map((project) => {
            if (project.type === "TVSeries") {
              return (
                <div>
                  <p>(tv show)</p>
                  <img src={project.image} height="200rem" />
                  <h3>{project.title}</h3>
                  <p>{project.year}</p>
                </div>
              );
            } else {
              return (
                <div>
                  <img src={project.image} height="200rem" />
                  <h3>{project.title}</h3>
                  <p>{project.year}</p>
                </div>
              );
            }
          })}
        </section>
      </article>
    </>
  ); */
};
