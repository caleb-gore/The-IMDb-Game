import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <h1>The IMDb Game</h1>
      </nav>

      <section>
        <button type="button" onClick={() => navigate("/register")}>GET STARTED</button>
        <button type="button" onClick={() => navigate("/login")}>I ALREADY HAVE AN ACCOUNT</button>
      </section>

      <hr />
      <h3>What is The IMDb Game?</h3>

      <p>
        The IMDb Game is an interactive movie trivia game inspired by the
        podcast "<a href="http://fightinginthewarroom.com/THOB/">
          This Had Oscar Buzz
        </a>"
        Created by Joe Reid and Chris Feil. In their words:
      </p>
      <blockquote>
        "Every week, we end our episode with the IMDb Game where we challenge
        each other with an actor or actress to try and guess the top four titles
        that IMDb says they are most known for. If any of those titles are
        television, voice only performances, or non acting credits, we mention
        that upfront. After two wrong guesses, we get the remaining titles'
        release years as a clue. And if that's not enough, it just becomes a
        free-for-all of hints. That's The IMDb Game"
      </blockquote>
    </>
  );
};
