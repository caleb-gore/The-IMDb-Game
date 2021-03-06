import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAvatars, getCurrentUser } from "../../managers/APIManager";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const imdbUser = JSON.parse(localStorage.getItem("imdb_user"));
  const userId = imdbUser.id;
  const [avatars, setAvatars] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUser(userId).then(setCurrentUser);

    getAllAvatars().then(setAvatars);
  }, []);

  const avatarImage = () => {
    if (avatars.length > 0) {
      const userAvatar = avatars.find(
        (avatar) => avatar.id === currentUser.avatarId
      );
      return userAvatar.image;
    }
  };

  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/profile">
          <img src={avatarImage()} height="50rem" />
          {currentUser.userName}
        </Link>
      </li>
      {localStorage.getItem("imdb_user") ? (
        <li className="navbar__item navbar__logout">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("imdb_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
