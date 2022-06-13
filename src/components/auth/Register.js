/* imports */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAvatars, getAllGenres, getUserFromEmail, postNewUser, searchMovies } from "../../managers/APIManager";
import "./Login.css";

/* component */
export const Register = (props) => {

  /* useState */
  const [genres, setGenres] = useState([]);
  const [searchTerms, updateSearchTerms] = useState('')
  const [results, updateResults] = useState({})
  const [avatars, setAvatars] = useState([])
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
      postNewUser(user)
      .then((createdUser) => {

        /* if 'user' object successfully saved to the API, set 'imdb_user' to local storage */
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "imdb_user",
            JSON.stringify({
              id: createdUser.id,
            })
          );
            /* navigate to main page */
          navigate("/home");
        }
      });
  };

  /* function called on form submittion */
  const handleRegister = (e) => {
    e.preventDefault();

    /* fetch users from API with submitted email */
      getUserFromEmail(user.email)
      .then((response) => {
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
    <main style={{ textAlign: "center" }}>

      {/* form */}
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Register for The IMDb Game
        </h1>

        {/* Full Name */}
        <fieldset>
          <label htmlFor="fullName"> Full Name </label>
          <input
            onChange={updateUser
        }
            type="text"
            id="fullName"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>

        {/* Email Address */}
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateUser
        }
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>

        {/* Username */}
        <fieldset>
          <label htmlFor="userName"> Username </label>
          <input
            onChange={updateUser
        }
            type="text"
            id="userName"
            className="form-control"
            placeholder="Create a Username"
            required
          />
        </fieldset>

        {/* Favorite Genre (Select) */}
        <fieldset>
          <label htmlFor="favGenreId"> Favorite Genre </label>
          <select onChange={
            (evt) => {
              const copy = {...user}
              copy.favGenreId = parseInt(evt.target.value)
              setUser(copy)
          }
          } type="checkbox" id="favGenreId" required >
            <option key="genre--0" value="0">
              Select a Genre
            </option>
            {/* map returns options using 'genres' from state */}
            {genres.map((genre) => (
              <option key={`genre--${genre.id}`} value={genre.id}>
                {genre.genre}
              </option>
            ))}
          </select>
        </fieldset>

        {/* Favorite Movie (search) */}
        <fieldset>
          <label htmlFor="favMovieId"> Favorite Movie </label>
          <input onChange={
            (evt) => {
                updateSearchTerms(evt.target.value)
                /* search movies from API */
                searchMovies(searchTerms)
                .then(updateResults)
            }
          } type="text" id="favMoovieId" className="form-control" placeholder="Search for a movie" required/>
          <div>
            {/* display search results */}
            {
                searchTerms.length > 0
                ? results?.results?.slice(0, 5).map(result => {
                    return <button type="button" onClick={(evt) => {
                        updateUser
                    (evt)
                        evt.target.style.backgroundColor = "pink"
                    }
                } id="favMovieId" value={result.id} className="form-control">{result.title} {result.description}</button>
                })
                : ""
            }
          </div>
        </fieldset>

        {/* Avatar (radio) */}
        <fieldset>
           <div >
            {/* display radio buttons from avatars in state */}
            {
                avatars.map(
                    (avatar) => {
                        return <label key={`radio--${avatar.id}`}>
                            <input onChange={
            (evt) => {
                const copy = {...user}
                copy.avatarId = parseInt(evt.target.value)
                setUser(copy)
            }
           } type="radio" name="avatar" value={avatar.id} required/>
                            <img src={avatar.image} width="75px" />
                        </label>
                    }
                )
            }
           </div>
        </fieldset>

        {/* Submit Button */}
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  );
};
