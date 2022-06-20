/* imports */
import { useNavigate } from "react-router-dom";

/* component */
export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <button type="button" onClick={() => navigate("/modes")}>
        Play A Game
      </button>
      <button>Leaderboard</button>
      <button type="button" onClick={() => navigate("/rules")}>
        Rules
      </button>
    </>
  );
};
