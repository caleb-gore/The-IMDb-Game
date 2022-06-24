/* imports */
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* component */
export const Modes = () => {
  const navigate = useNavigate();
  return (
    <>
    <Container fluid style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
      <h3>Select Play Mode</h3>

      <ButtonGroup vertical style={{textAlign: "center"}}>
      <Button variant="warning" onClick={() => navigate("/game")}>
        Normal Mode
      </Button>
      <Button variant="light" disabled>Timed Mode</Button>
      <Button variant="light" disabled>Challenge Mode</Button>
      
    </ButtonGroup>
    <Button variant="outline-warning" 
            onClick={() => {
              navigate("/dashboard")
            }}
          >
            go back
          </Button>
    </Container>
    </>
  );
};
