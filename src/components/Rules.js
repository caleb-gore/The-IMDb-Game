import { useNavigate } from "react-router-dom"

export const Rules = () => {
    const navigate = useNavigate()

    return <>
    <h2>Rules</h2>
    
    <h3>Your mission, should you choose to accept it... </h3>
    <p>You will be shown an actor or actress and challenged to guess the top four titles that IMDb says they are most known for.</p>
    <p>If any of those titles are television, voice only performance, or non-acting credits, we mention that upfront.</p>
    <p>After two wrong guesses, you get the remaining titles' release years as a clue.</p>
    <p>And if that's not enough, it just becomes a free-for-all of hints</p>

    <h3>It's time to settle the score...</h3>
    <p>Each correct guess is worth 15 points</p>
    <p>After two wrong guesses, each new correct guess becomes worth 10 points</p>
    <p>After hints are unlocked, each wrong answer will subtract 1 point from your score and each hint used will subtract 2 points</p>
    

    <button onClick={() => navigate("/dashboard")}>Back</button>
    </>
}