/* import */
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../images/TheImdbGameAnimatedLogo.gif";
import logoSVG from "../images/TheImdbGameLogo.svg";
import "./Welcome.css";
/* component */
export const Welcome = () => {
  /* navigate */
  const navigate = useNavigate();
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIntro(false);
    }, 2500);
  }, []);
  /* return */
  if (intro) {
    return (
      <>
        <div
          style={{
            backgroundColor: "black",
            width: "100vw",
            height: "100vh",
          }}
        >
          <img
            style={{}}
            className={"centered"}
            src={logo}
            alt="imdb Game Animated Logo"
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="m-3">
          {/* title */}
          <nav className="displayFlex">
            <img src={logoSVG} className={"logoHeaderSize"} />
          </nav>

          {/* buttons */}
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button variant="warning" onClick={() => navigate("/register")}>
              GET STARTED
            </Button>
            <Button variant="outline-dark" onClick={() => navigate("/login")}>
              I ALREADY HAVE AN ACCOUNT
            </Button>
          </Stack>

          {/* subtitle */}
          <hr />
          <h3>What is The IMDb Game?</h3>

          {/* description */}
          <p>
            The IMDb Game is an interactive movie trivia game inspired by the
            podcast "
            <a href="http://fightinginthewarroom.com/THOB/">
              This Had Oscar Buzz
            </a>
            " Created by Joe Reid and Chris Feil. In their words:
          </p>
          <blockquote>
            "Every week, we end our episode with the IMDb Game where we
            challenge each other with an actor or actress to try and guess the
            top four titles that IMDb says they are most known for. If any of
            those titles are television, voice only performances, or non acting
            credits, we mention that upfront. After two wrong guesses, we get
            the remaining titles' release years as a clue. And if that's not
            enough, it just becomes a free-for-all of hints. That's The IMDb
            Game"
          </blockquote>
        </div>
      </>
    );
  }
};
