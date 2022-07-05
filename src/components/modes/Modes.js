/* imports */
import { Button, ButtonGroup, Container, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* component */
export const Modes = () => {
  const navigate = useNavigate();
  return (
    <>
    <Container fluid style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
      <h3>Select Play Mode</h3>

      <Stack gap={2} className="w-25 mx-auto" vertical style={{textAlign: "center"}}>
      <Button variant="warning" onClick={() => navigate("/game")}>
        Normal Mode
      </Button>
      <Button variant="warning" disabled>Timed Mode</Button>
      <Button variant="warning" disabled>Challenge Mode</Button>
      
    </Stack>
    <Button className="w-25 mx-auto mt-2" variant="outline-warning" 
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
