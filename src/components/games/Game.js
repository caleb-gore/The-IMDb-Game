import { useEffect, useState } from "react";
import { getActor, getProject, getUserGames } from "../../managers/APIManager";

export const Game = ({ game, actor }) => {
  const [guess, updateGuess] = useState("");
  const [searchTerm, updateSearchTerm] = useState("");
  const [knownFor, updateKnownFor] = useState([]);
  const [guessedStatus, updateGuessedStatus] = useState([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    updateKnownFor(actor.knownFor);
  }, [actor]);

  useEffect(() => {
    knownFor.map((project) => {
        if (project.title.toLowerCase().includes(guess.toLowerCase())) {
            const copy = [...guessedStatus]
            copy[knownFor.indexOf(project)] = true
            updateGuessedStatus(copy)
        }
    });
  }, [guess]);

  return (
    <section className="game__item game">
      <input
        value={searchTerm}
        onChange={(e) => {
          updateSearchTerm(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateGuess(searchTerm)
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
      {knownFor?.map((project) => {
        if (guessedStatus[knownFor.indexOf(project)]) {
          return <h3>{project.title}</h3>;
        } else {
          return <h3>title</h3>;
        }
      })}
    </section>
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
