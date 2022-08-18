import { Button } from "react-bootstrap";

export const Hints = (
  {
    hintsUnlocked,
    updateHintsUnlocked,
  } /* { game, setHintsEnabled, hintsEnabled } */
) => {
  return (
    <>
      {hintsUnlocked ? (
        ""
      ) : (
        <Button
          className="w-25 mt-3 mx-auto"
          variant="warning"
          onClick={() => {
            updateHintsUnlocked(true);
          }}
        >
          UNLOCK HINTS
        </Button>
      )}
    </>
  );
  // const hintText = () => {
  //   if (game?.incorrectAnswers < 2) {
  //     return (
  //       <h3>Hints Unlock in {3 - game?.incorrectAnswers} wrong answers</h3>
  //     );
  //   } else {
  //     return <h3>Hints Unlock in {3 - game?.incorrectAnswers} wrong answer</h3>;
  //   }
  // };

  // const hintCheck = () => {
  //   if (hintsEnabled) {
  //     return "";
  //   } else {
  //     return (
  //       <button
  //         onClick={() => {
  //           setHintsEnabled(true);
  //         }}
  //       >
  //         Unlock Hints
  //       </button>
  //     );
  //   }
  // };
  // return <>{game?.incorrectAnswers < 3 ? hintText() : hintCheck()}</>;
};
