export const Hints = ({ game, setHintsEnabled, hintsEnabled }) => {
  const hintText = () => {
    if (game?.incorrectAnswers < 2) {
      return (
        <h3>Hints Unlock in {3 - game?.incorrectAnswers} wrong answers</h3>
      );
    } else {
      return <h3>Hints Unlock in {3 - game?.incorrectAnswers} wrong answer</h3>;
    }
  };

  const hintCheck = () => {
    if (hintsEnabled) {
      return "";
    } else {
      return (
        <button
          onClick={() => {
            setHintsEnabled(true);
          }}
        >
          Unlock Hints
        </button>
      );
    }
  };
  return <>{game?.incorrectAnswers < 3 ? hintText() : hintCheck()}</>;
};
