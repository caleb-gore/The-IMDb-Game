import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllAvatars, getCurrentUser } from "../../managers/APIManager";
import "./NavBar.css";
import logoSVG from "../../images/TheImdbGameLogoTransparent.svg"
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
      return userAvatar?.image;
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="navbar">
          <Navbar.Brand className="brand" href="/">
          <img src={logoSVG} height="75" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Avatar alt="avatar" src={avatarImage()} />{" "}
            <Nav.Link href="/profile">{currentUser.userName}</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={() => {
                localStorage.removeItem("imdb_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );

  // <Navbar bg="light">
  //   <Container>
  //     <Navbar.Brand className="d-flex flex-row">
  //         <p className="mr-2">{currentUser.userName}</p>
  //       <Link className="navbar__link " to="/profile">
  //         <Avatar  alt="avatar" src={avatarImage()} />
  //       </Link>
  //     </Navbar.Brand>
  //     <ul className="navbar">
  //       <li className="navbar__item active"></li>
  //       {localStorage.getItem("imdb_user") ? (
  //         <li className="navbar__item navbar__logout">
  //           <Link
  //             className="navbar__link"
  //             to=""
  //             onClick={() => {
  //               localStorage.removeItem("imdb_user");
  //               navigate("/", { replace: true });
  //             }}
  //           >
  //             Logout
  //           </Link>
  //         </li>
  //       ) : (
  //         ""
  //       )}
  //     </ul>
  //   </Container>
  // </Navbar>
  // );
};
