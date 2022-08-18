import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { getProject } from "../../../managers/APIManager";
import { HintButtons } from "../HintButtons";

export const HTMLIfNotGuessed = ({
  project,
  hintStatus,
  knownForArray,
  updateHintStatus,
  hintsUnlocked,
  gameState,
  updateGameState,
}) => {
  const [projectDetails, setProjectDetails] = useState(undefined);
  const [projectDetailsArray, setProjectDetailsArray] = [];
  const [seeHints, updateSeeHints] = useState(false);

  useEffect(() => {
    getProject(project.id).then(setProjectDetails);
  }, [project]);

  const hangManifyTitle = (string) => {
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

  return (
    <Card className="text-center" key={`project--${project.id}`}>
      <Card.Header as="h6">
        {projectDetails?.type === "TVSeries" ? "TV Series" : "‎"}
      </Card.Header>
      <Card.Img
        variant="top"
        src="https://previews.123rf.com/images/mdesignstudio/mdesignstudio1506/mdesignstudio150600029/41031151-colorful-poster-with-question-mark-poster-concept.jpg"
      />
      <Card.Body>
        {hintsUnlocked ? (
          <>
            <Card.Title>{hangManifyTitle(project.title)}</Card.Title>
            <Card.Subtitle>{project.year}</Card.Subtitle>
          </>
        ) : (
          ""
        )}
        {hintsUnlocked && !seeHints ? (
          <Button
            variant="warning"
            onClick={() => {
              const copy = [...hintStatus];
              copy[knownForArray.indexOf(project)] = true;
              updateHintStatus(copy);
              updateSeeHints(true);
            }}
          >
            see hint
          </Button>
        ) : (
          "‎"
        )}
      </Card.Body>
      {hintStatus[knownForArray.indexOf(project)] ? (
        <Card.Footer>
          <HintButtons
            projectDetails={projectDetails}
            gameState={gameState}
            updateGameState={updateGameState}
          />
        </Card.Footer>
      ) : (
        ""
      )}
    </Card>
    // <section className="d-flex flex-column align-items-center m-3 text-center" key={`project--${project.id}`}>
    //   {hintsUnlocked && projectDetails?.type === "TVSeries" ? (
    //     <h5>TV Series</h5>
    //   ) : (
    //     ""
    //   )}
    //   {hintsUnlocked && !seeHints ? (
    //     <button
    //       onClick={() => {
    //         const copy = [...hintStatus];
    //         copy[knownForArray.indexOf(project)] = true;
    //         updateHintStatus(copy);
    //         updateSeeHints(true);
    //       }}
    //     >
    //       see hint
    //     </button>
    //   ) : (
    //     ""
    //   )}
    //   {hintStatus[knownForArray.indexOf(project)] ? (
    //     <>
    //       <HintButtons projectDetails={projectDetails} />
    //     </>
    //   ) : (
    //     <img
    //       src="https://previews.123rf.com/images/mdesignstudio/mdesignstudio1506/mdesignstudio150600029/41031151-colorful-poster-with-question-mark-poster-concept.jpg"
    //       height="200rem"
    //       alt="project"
    //     />
    //   )}
    //   <h3>{hangManifyTitle(project.title)}</h3>
    //   {hintsUnlocked ? <h4>{project.year}</h4> : ""}
    // </section>
  );
};
