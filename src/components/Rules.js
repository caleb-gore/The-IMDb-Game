import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const Rules = () => {
    const navigate = useNavigate()

    return <Container className="text-center mt-3">
    <h2>Rules</h2>
    
    <h3>Your mission, should you choose to accept it... </h3>
    <p>You will be shown an actor or actress and challenged to guess the top four (or sometimes less) titles that IMDb says they are most known for.</p>
    <p>If any of those titles are television, voice only performance, or non-acting credits, we mention that upfront.</p>
    <p>After two wrong guesses, you can unlock hints and be given the remaining titles' release years as a clue.</p>
    <p>And if that's not enough, it just becomes a free-for-all of hints</p>

    <h3>It's time to settle the score...</h3>
    <p>Each correct guess is worth 10 points</p>
    <p>Unlocking hints will subtract 2 points from your score</p>
    <p>After hints are unlocked, each hint used will subtract an additional 2 points</p>
    

    <Button variant="outline-warning" onClick={() => navigate("/dashboard")}>Go Back</Button>
    </Container>
}