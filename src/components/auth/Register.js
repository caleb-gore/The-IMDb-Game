import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const [genres, setGenres] = useState([]);
  const [searchTerms, updateSearchTerms] = useState('')
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    userName: "",
    favMovieId: 0,
    favGenreId: 0,
    avatarId: 0,
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "imdb_user",
            JSON.stringify({
              id: createdUser.id,
            })
          );

          navigate("/");
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${customer.email}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          // Duplicate email. No good.
          window.alert("Account with that email address already exists");
        } else {
          // Good email, create user.
          registerNewUser();
        }
      });
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    copy[evt.target.id] = evt.target.value;
    setCustomer(copy);
  };

  useEffect(() => {
    fetch(`http://localhost:8088/genres`)
      .then((response) => response.json())
      .then(setGenres);
  }, []);

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Register for The IMDb Game
        </h1>
        <fieldset>
          <label htmlFor="fullName"> Full Name </label>
          <input
            onChange={updateCustomer}
            type="text"
            id="fullName"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateCustomer}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="userName"> Username </label>
          <input
            onChange={updateCustomer}
            type="text"
            id="userName"
            className="form-control"
            placeholder="Create a Username"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="favGenreId"> Favorite Genre </label>
          <select onChange={updateCustomer} type="checkbox" id="favGenreId">
            <option key="genre--0" value="0">
              Select a Genre
            </option>
            {genres.map((genre) => (
              <option key={`genre--${genre.id}`} value={genre.id}>
                {genre.genre}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="favGenreId"> Favorite Movie </label>
          <input onChange={
            (evt) => {
                updateSearchTerms(evt.target.value)
            }
          } type="text" id="favMoovieId" className="form-control" placeholder="Search for a movie" required autoFocus/>
        </fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  );
};
