import { Card } from "react-bootstrap";

export const HTMLIfGuessed = ({ project }) => {
  return (
    <Card className="text-center" key={`project--${project.id}`}>
      <Card.Header as="h6">as {project.role}</Card.Header>
      <Card.Img variant="top" src={project.image} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Subtitle>{project.year}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

/* <Card className="text-center" key={`project--${project.id}`}>
      <Card.Header as="h6">
        {projectDetails?.type === "TVSeries" ? "TV Series" : "‎"}
      </Card.Header>
      <Card.Img
        variant="top"
        src="https://previews.123rf.com/images/mdesignstudio/mdesignstudio1506/mdesignstudio150600029/41031151-colorful-poster-with-question-mark-poster-concept.jpg"
      />
      <Card.Body>
        <Card.Title>{hangManifyTitle(project.title)}</Card.Title>
        {hintsUnlocked ? <Card.Subtitle>{project.year}</Card.Subtitle> : ""}
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
          <HintButtons projectDetails={projectDetails} />
        </Card.Footer>
      ) : "" }
    </Card> */
