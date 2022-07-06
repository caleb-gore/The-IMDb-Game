/* imports */
import { FilePresent } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  FormGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getAllAvatars,
  getAllGenres,
  getUserFromEmail,
  postNewUser,
  searchMovies,
} from "../../managers/APIManager";
import "./Login.css";

/* component */
export const Register = (props) => {
  /* useState */
  const [genres, setGenres] = useState([]);
  const [searchTerms, updateSearchTerms] = useState("");
  const [results, updateResults] = useState({});
  const [avatars, setAvatars] = useState([]);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    userName: "",
    favMovieId: 0,
    favGenreId: 0,
    avatarId: 0,
  });

  /* navigate */
  let navigate = useNavigate();

  /* new user registration */
  const registerNewUser = () => {
    /* POST new user to API */
    postNewUser(user).then((createdUser) => {
      /* if 'user' object successfully saved to the API, set 'imdb_user' to local storage */
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "imdb_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );
        /* navigate to main page */
        navigate("/dashboard");
      }
    });
  };

  /* function called on form submission */
  const handleRegister = (e) => {
    e.preventDefault();

    /* fetch users from API with submitted email */
    getUserFromEmail(user.email).then((response) => {
      /* if fetch returns a user... */
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  /* updates 'user' object state with input from form */
  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  /* initial state - get genres and avatars from API */
  useEffect(() => {
    getAllGenres().then(setGenres);
    getAllAvatars().then(setAvatars);
  }, []);

  /* JSX */
  return (
    <Container
      fluid
      className={"mt-3"}
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      {/* form */}
      <h1 className="h3 mb-3 font-weight-normal">
        Please Register for The IMDb Game
      </h1>
      <Form
        style={{ textAlign: "left", maxWidth: "90%" }}
        onSubmit={handleRegister}
      >
        {/* Full Name */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="fullName"> Full Name </Form.Label>
          <Form.Control
            onChange={updateUser}
            type="text"
            id="fullName"
            className="form-control"
            placeholder="Enter your name"
            autoComplete="off"
            required
            autoFocus
          />
        </Form.Group>

        {/* Email Address */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email"> Email address </Form.Label>
          <Form.Control
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            autoComplete="off"
            placeholder="Email address"
            required
          />
        </Form.Group>

        {/* Username */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="userName"> Username </Form.Label>
          <Form.Control
            onChange={updateUser}
            type="text"
            id="userName"
            className="form-control"
            autoComplete="off"
            placeholder="Create a Username"
            required
          />
        </Form.Group>

        {/* Favorite Genre (Select) */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="favGenreId"> Favorite Genre </Form.Label>
          <Form.Select
            onChange={(evt) => {
              const copy = { ...user };
              copy.favGenreId = parseInt(evt.target.value);
              setUser(copy);
            }}
            type="checkbox"
            id="favGenreId"
            required
          >
            <option key="genre--0" value="0">
              Select a Genre
            </option>
            {/* map returns options using 'genres' from state */}
            {genres.map((genre) => (
              <option key={`genre--${genre.id}`} value={genre.id}>
                {genre.genre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Favorite Movie (search) */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="favMovieId"> Favorite Movie </Form.Label>
          <Form.Control
            onChange={(evt) => {
              updateSearchTerms(evt.target.value);
              /* search movies from API */
              searchMovies(searchTerms).then(updateResults);
            }}
            type="text"
            id="favMovieId"
            className="form-control"
            autoComplete="off"
            placeholder="Search for a movie"
            required
          />
          <div>
            {/* display search results */}
            {searchTerms.length > 0 ? (
              <ButtonGroup vertical>
                {results?.results?.slice(0, 5).map((result) => {
                  return (
                    <Button
                      variant="dark outline"
                      onClick={(evt) => {
                        updateUser(evt);
                        updateSearchTerms("");
                      }}
                      id="favMovieId"
                      value={result.id}
                      className="form-control"
                    >
                      {result.title} {result.description}
                    </Button>
                  );
                })}
              </ButtonGroup>
            ) : (
              ""
            )}
          </div>
        </Form.Group>

        {/* Avatar (radio) */}
        <Form.Group className="mb-3">
          <div>
            {/* display radio buttons from avatars in state */}
            {avatars.map((avatar) => {
              return (
                <Form.Label key={`radio--${avatar.id}`}>
                  <Form.Control
                    onChange={(evt) => {
                      const copy = { ...user };
                      copy.avatarId = parseInt(evt.target.value);
                      setUser(copy);
                    }}
                    type="radio"
                    name="avatar"
                    value={avatar.id}
                    required
                  />
                  <Avatar
                    sx={{ width: 60, height: 60 }}
                    className="m-2"
                    src={avatar.image}
                    width="75px"
                  />
                </Form.Label>
              );
            })}
          </div>
        </Form.Group>

        {/* Submit Button */}

        <Button className=" mx-auto w-25" variant="warning" type="submit">
          {" "}
          Register{" "}
        </Button>
      </Form>
    </Container>
  );
};
