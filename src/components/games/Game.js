import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getList,
  getLosers,
  getProject,
  getUserGames,
  getWinners,
  postGame,
  putGame,
} from "../../managers/APIManager"; //fetch movie objects from API
import { Actor } from "./Actor";
import { GameBoard } from "./GameBoard";
import { GameOver } from "./GameOver";
import { Hints } from "./Hints";
import "./Game.css";
import spinner from "../../images/Spinner-1s-200px.gif";

export const Game = (
  {
    gameState,
    setGameState,
    listFromAPI,
    chosenCategory,
  } /* { game, actor, exportGameState, changeActorOutcome } */
) => {
  const navigate = useNavigate();
  const [actorObjectFromList, exportActor] = useState(undefined);
  const [gameOver, updateGameOver] = useState(false);
  const [hintsUnlocked, updateHintsUnlocked] = useState(false);
  const [showLoser, setShowLoser] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [losers, setLosers] = useState([]);
  const [winners, setWinners] = useState([]);

  const handleCloseLoser = () => setShowLoser(false);
  const handleCloseWinner = () => setShowWinner(false);
  const handleShowLoser = () => setShowLoser(true);
  const handleShowWinner = () => setShowWinner(true);

  useEffect(() => {
    getLosers().then(setLosers);
    getWinners().then(setWinners);
  }, []);

  /* update game state with actor id (from actor component) */
  useEffect(() => {
    if (actorObjectFromList !== undefined) {
      const copy = { ...gameState };
      copy.actorId = actorObjectFromList?.id;
      setGameState(copy);
    }
  }, [actorObjectFromList]);

  useEffect(() => {
    if (gameOver) {
      handleShowWinner();
    }
  }, [gameOver]);
  return (
    <>
      {/* display loading until listFromAPI is updated */}
      {listFromAPI === undefined ? (
        <img className="centered" src={spinner} />
      ) : (
        // <h1
        //   style={{
        //     textAlign: "center",
        //     alignSelf: "center",
        //     justifyContent: "center",
        //   }}
        // >
        //   <h2 className="animate">Loading</h2>
        // </h1>
        <>
          <Container className="d-flex flex-row justify-content-around mt-3 mb-3">
            <h2 className="m-auto">{chosenCategory.name}</h2>
            <h2 className="m-auto">Score: {gameState.score}</h2>
            <h2 className="m-auto">❌: {gameState.incorrectAnswers}</h2>
            <Button
              className="m-2 w-25 mx-auto"
              variant="warning"
              onClick={handleShowLoser}
            >
              Give Up?
            </Button>

            <Modal
            style={{textAlign: "center"}}
              centered
              show={showLoser}
              onHide={() => {
                handleCloseLoser();
                const copy = { ...gameState };
                copy.outcome = "forfeit";
                setGameState(copy);
                postGame(copy).then(updateGameOver(true));
                navigate("/dashboard");
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>GAME OVER</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  width="100%"
                  src={losers[Math.floor(Math.random() * losers.length)].gif}
                />
                <h3>better luck next time</h3>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="warning"
                  onClick={() => {
                    handleCloseLoser();
                    const copy = { ...gameState };
                    copy.outcome = "forfeit";
                    setGameState(copy);
                    postGame(copy).then(updateGameOver(true));
                    navigate("/dashboard");
                  }}
                >
                  Back To Dashboard
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
          <Container className="d-flex">
            {/* container for actor and gameboard components */}
            <Actor
              listFromAPI={listFromAPI}
              exportActor={exportActor}
              updateHintsUnlocked={updateHintsUnlocked}
              gameState={gameState}
              updateGameState={setGameState}
            />
            <GameBoard
              actorObjectFromList={actorObjectFromList}
              gameState={gameState}
              updateGameState={setGameState}
              updateGameOver={updateGameOver}
              hintsUnlocked={hintsUnlocked}
              updateHintsUnlocked={updateHintsUnlocked}
            />
          </Container>

          <Modal
            style={{textAlign: "center"}}
            centered
            show={showWinner}
            onHide={() => {
              handleCloseWinner();
              navigate("/dashboard");
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>CONGRATULATIONS!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                width="100%"
                src={winners[Math.floor(Math.random() * winners.length)].gif}
              />
              <h3>You're a Winner, Harry!</h3>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                onClick={() => {
                  handleCloseWinner();
                  navigate("/dashboard");
                }}
              >
                Back To Dashboard
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );

  // const navigate = useNavigate();
  // const [guess, updateGuess] = useState(""); // most recent guess submitted
  // const [searchTerm, updateSearchTerm] = useState(""); // text in the search box
  // const [knownFor, updateKnownFor] = useState([]); // array of "known For" objects from actor object
  // const [knownForDetails, setKnownForDetails] = useState([]); // array of detailed "known For" objects from API
  // const [guessedStatus, updateGuessedStatus] = useState([
  //   false,
  //   false,
  //   false,
  //   false,
  // ]); // array holding the isGuessed state of movies
  // const [hintStatus, updateHintStatus] = useState([false, false, false, false]);
  // const [gameState, updateGameState] = useState({}); // current state of game object
  // const [previousGuesses, updatePreviousGuesses] = useState([]); // array of submitted guesses
  // const [hintsEnabled, setHintsEnabled] = useState(false);

  // const setUnguessedImage = (projectIndex) => {
  //   if (hintStatus[projectIndex]) {
  //     const copy = { ...gameState };
  //     return (
  //       <div>
  //         <button
  //           onClick={() => {
  //             window.alert(knownForDetails[projectIndex].plot);
  //             copy.score -= 2;
  //             updateGameState(copy);
  //           }}
  //         >
  //           Plot
  //         </button>

  //         {knownForDetails[projectIndex].awards !== "" ? (
  //           <button
  //             onClick={() => {
  //               window.alert(knownForDetails[projectIndex].awards);
  //               copy.score -= 2;
  //               updateGameState(copy);
  //             }}
  //           >
  //             Awards
  //           </button>
  //         ) : (
  //           ""
  //         )}
  //         <button
  //           onClick={() => {
  //             window.alert(knownForDetails[projectIndex].stars);
  //             copy.score -= 2;
  //             updateGameState(copy);
  //           }}
  //         >
  //           Stars
  //         </button>
  //         {knownForDetails[projectIndex].directors !== "" ? (
  //           <button
  //             onClick={() => {
  //               window.alert(knownForDetails[projectIndex].directors);
  //               copy.score -= 2;
  //               updateGameState(copy);
  //             }}
  //           >
  //             Directors
  //           </button>
  //         ) : (
  //           ""
  //         )}
  //         <button
  //           onClick={() => {
  //             window.alert(knownForDetails[projectIndex].genres);
  //             copy.score -= 2;
  //             updateGameState(copy);
  //           }}
  //         >
  //           Genres
  //         </button>
  //         <button
  //           onClick={() => {
  //             window.alert(knownForDetails[projectIndex].keywords);
  //             copy.score -= 2;
  //             updateGameState(copy);
  //           }}
  //         >
  //           Keywords
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <img
  //         src="https://previews.123rf.com/images/mdesignstudio/mdesignstudio1506/mdesignstudio150600029/41031151-colorful-poster-with-question-mark-poster-concept.jpg"
  //         height="200rem"
  //       />
  //     );
  //   }
  // };

  // const hintCheck = (projectIndex) => {
  //   if (hintsEnabled) {
  //     return (
  //       <button
  //         onClick={() => {
  //           const copy = [...hintStatus];
  //           copy[projectIndex] = true;
  //           updateHintStatus(copy);
  //         }}
  //       >
  //         ?
  //       </button>
  //     );
  //   }
  // };

  // /* check if project is TV Series */
  // const typeCheck = (projectId) => {
  //   const currentProject = knownForDetails?.find(
  //     (project) => project.id === projectId
  //   );
  //   if (currentProject?.type === "TVSeries") {
  //     return <div>TV SERIES</div>;
  //   } else if (currentProject?.errorMessage === "VideoGame is not valid") {
  //     return <div>VIDEO GAME</div>;
  //   }
  // };

  // /* hide titles before they are guessed */
  // const questionMarkMaker = (string) => {
  //   let newString = "";
  //   for (let i = 0; i < string.length; i++) {
  //     const code = string.charCodeAt(i);
  //     if (
  //       !(code > 47 && code < 58) &&
  //       !(code > 64 && code < 91) &&
  //       !(code > 96 && code < 123)
  //     ) {
  //       newString += string[i];
  //     } else {
  //       newString += "-";
  //     }
  //   }
  //   return newString;
  // };

  // /* set knownFor based on actor */
  // useEffect(() => {
  //   updateKnownFor(actor.knownFor);
  // }, [actor]);

  // /* set knownForDetails based on knownFor */
  // useEffect(() => {
  //   const projectPromises = knownFor?.map((project) => {
  //     return getProject(project.id);
  //   });
  //   if (projectPromises?.length > 0) {
  //     Promise.all(projectPromises).then(setKnownForDetails);
  //   }
  // }, [knownFor]);

  // /* set guessedStatus based on guess */
  // useEffect(() => {
  //   const correctProject = knownFor.find(
  //     (project) => project.title.toLowerCase() === guess.toLowerCase()
  //   );

  //   const correctProjectIndex = knownFor.indexOf(correctProject);
  //   if (correctProject && !guessedStatus[correctProjectIndex]) {
  //     const guessCopy = [...guessedStatus];
  //     guessCopy[correctProjectIndex] = true;
  //     updateGuessedStatus(guessCopy);

  //     const gameCopy = { ...gameState };
  //     gameCopy.correctAnswers++;
  //     gameCopy.incorrectAnswers < 2
  //       ? (gameCopy.score += 15)
  //       : (gameCopy.score += 10);
  //     updateGameState(gameCopy);

  //     const previousGuessesCopy = [...previousGuesses];
  //     previousGuessesCopy.push(guess.toLowerCase());
  //     updatePreviousGuesses(previousGuessesCopy);
  //   } else {
  //     const gameCopy = { ...gameState };
  //     gameCopy.incorrectAnswers++;
  //     if (hintsEnabled) {
  //       gameCopy.score -= 1;
  //     }
  //     updateGameState(gameCopy);

  //     const previousGuessesCopy = [...previousGuesses];
  //     previousGuessesCopy.push(guess.toLowerCase());
  //     updatePreviousGuesses(previousGuessesCopy);
  //   }
  // }, [guess]);

  // useEffect(() => {
  //   updateGameState(game);
  // }, [game]);

  // useEffect(() => {
  //   if (searchTerm !== "" && previousGuesses.indexOf(searchTerm) > -1) {
  //     window.alert("You already guessed this");
  //   }
  // }, [searchTerm]);

  // // useEffect(() => {
  // //   if (!gameState) {
  // //     console.log("gameState does not exist");
  // //   } else if (gameState) {
  // //     exportGameState(gameState);
  // //     console.log(gameState);
  // //     putGame(gameState);
  // //   }
  // // }, [gameState]);

  // useEffect(() => {
  //   updateGameState(changeActorOutcome);
  // }, [changeActorOutcome]);
  // useEffect(() => {
  //   const variable = guessedStatus.filter((index) => index === false);
  //   if (variable.length === 0) {
  //     const copy = { ...gameState };
  //     copy.outcome = "won";
  //     window.alert("You Won!!!");
  //     console.log("won copy", copy);
  //     putGame(copy).then(navigate("/dashboard"));
  //   }
  // }, [guessedStatus]);

  // return (
  //   <>
  //     <section className="game__item game">
  //       <input
  //         value={searchTerm}
  //         onChange={(e) => {
  //           updateSearchTerm(e.target.value);
  //         }}
  //         onKeyDown={(e) => {
  //           if (e.key === "Enter") {
  //             updateGuess(searchTerm);
  //             updateSearchTerm("");
  //           }
  //         }}
  //       />
  //       <button
  //         onClick={() => {
  //           updateGuess(searchTerm);
  //           updateSearchTerm("");
  //         }}
  //       >
  //         GUESS
  //       </button>
  //       <>
  //         {gameState?.incorrectAnswers > 1 ? <div>Years Unlocked</div> : <></>}
  //       </>
  //       <div>Score: {gameState?.score}</div>
  //       <div>
  //         {gameState?.incorrectAnswers ? (
  //           <div>❌: {gameState?.incorrectAnswers}</div>
  //         ) : (
  //           ""
  //         )}
  //       </div>
  //       <Hints
  //         game={gameState}
  //         setHintsEnabled={setHintsEnabled}
  //         hintsEnabled={hintsEnabled}
  //       />
  //       {knownFor?.map((project) => {
  //         if (guessedStatus[knownFor.indexOf(project)]) {
  //           return (
  //             <section key={`project--${project.id}`}>
  //               {typeCheck(project.id)}
  //               <img src={project.image} height="200rem" />
  //               <h3>{project.title}</h3>
  //               <h4>{project.year}</h4>
  //             </section>
  //           );
  //         } else if (gameState.incorrectAnswers < 2) {
  //           return (
  //             <section key={`project--${project.id}`}>
  //               {typeCheck(project.id)}
  //               <img
  //                 src="https://previews.123rf.com/images/mdesignstudio/mdesignstudio1506/mdesignstudio150600029/41031151-colorful-poster-with-question-mark-poster-concept.jpg"
  //                 height="200rem"
  //               />
  //               <h3>{questionMarkMaker(project.title)}</h3>
  //             </section>
  //           );
  //         } else {
  //           return (
  //             <section key={`project--${project.id}`}>
  //               {typeCheck(project.id)}
  //               {hintCheck(knownFor.indexOf(project))}
  //               {setUnguessedImage(knownFor.indexOf(project))}
  //               <h3>{questionMarkMaker(project.title)}</h3>
  //               <h4>{project.year}</h4>
  //             </section>
  //           );
  //         }
  //       })}
  //       <section>
  //         <button
  //           onClick={() => {
  //             if (gameState) {
  //               const copy = { ...gameState };
  //               copy.outcome = "forfeit";

  //               const unguessed = knownFor.filter(
  //                 (project) => !guessedStatus[knownFor.indexOf(project)]
  //               );
  //               window.alert(
  //                 `You Missed: ${unguessed.map((project) => project.title)}`
  //               );
  //               putGame(copy).then(navigate("/dashboard"));
  //             }
  //           }}
  //         >
  //           Give Up?
  //         </button>
  //       </section>
  //     </section>
  //   </>
  // );
};
