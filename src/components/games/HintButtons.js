import { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";

export const HintButtons = ({projectDetails, gameState, updateGameState}) => {
    
  const [showPlot, setShowPlot] = useState(false);
  const [showDirectors, setShowDirectors] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  
  const handleClosePlot = () => setShowPlot(false);
  const handleCloseDirectors = () => setShowDirectors(false);
  const handleCloseStars = () => setShowStars(false);
  const handleCloseGenres = () => setShowGenres(false);
  const handleCloseKeywords = () => setShowKeywords(false);
  
  const handleShowPlot = () => setShowPlot(true);
  const handleShowDirectors = () => setShowDirectors(true);
  const handleShowStars = () => setShowStars(true);
  const handleShowGenres = () => setShowGenres(true);
  const handleShowKeywords = () => setShowKeywords(true);
  
    return (
      <>
    <ButtonGroup vertical>
        {projectDetails?.plot ? <Button
        variant="outline-warning"
        onClick={() => {
          handleShowPlot()
          const copy = {...gameState}
          copy.score -= 2
          updateGameState(copy)}}
      >
        plot
      </Button> : ""}
      {projectDetails?.directors ? <Button
        variant="outline-warning"
        onClick={() => {
          handleShowDirectors() 
        const copy = {...gameState}
        copy.score -= 2
        updateGameState(copy)}}
      >
        director
      </Button> : ""}
      {projectDetails?.stars ? <Button
        variant="outline-warning"
        onClick={() => {
          handleShowStars()
          const copy = {...gameState}
          copy.score -= 2
          updateGameState(copy)
        }}
      >
        stars
      </Button> : ""}
      {projectDetails?.genres ? <Button
        variant="outline-warning"
        onClick={() => {
          handleShowGenres()
          const copy = {...gameState}
          copy.score -= 2
          updateGameState(copy)}}
      >
        genre
      </Button> : ""}
      {projectDetails?.keywords ? <Button
        variant="outline-warning"
        onClick={() => {
          handleShowKeywords()
          const copy = {...gameState}
          copy.score -= 2
          updateGameState(copy)}}
      >
        keywords
      </Button>: ""}
      
    </ButtonGroup>

    <Modal centered show={showPlot} onHide={handleClosePlot}>
        <Modal.Header closeButton>
          <Modal.Title>Plot</Modal.Title>
        </Modal.Header>
        <Modal.Body>{projectDetails.plot}</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClosePlot}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    <Modal centered show={showDirectors} onHide={handleCloseDirectors}>
        <Modal.Header closeButton>
          <Modal.Title>Directors</Modal.Title>
        </Modal.Header>
        <Modal.Body>{projectDetails.directors}</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseDirectors}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    <Modal centered show={showStars} onHide={handleCloseStars}>
        <Modal.Header closeButton>
          <Modal.Title>Stars</Modal.Title>
        </Modal.Header>
        <Modal.Body>{projectDetails.stars}</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseStars}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    <Modal centered show={showGenres} onHide={handleCloseGenres}>
        <Modal.Header closeButton>
          <Modal.Title>Genres</Modal.Title>
        </Modal.Header>
        <Modal.Body>{projectDetails.genres}</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseGenres}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    <Modal centered show={showKeywords} onHide={handleCloseKeywords}>
        <Modal.Header closeButton>
          <Modal.Title>Keywords</Modal.Title>
        </Modal.Header>
        <Modal.Body>{projectDetails.keywords}</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseKeywords}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
};
