import { imdbAPIKey } from "./APIKeyManager";



/* GET calls */

export const getAllAvatars = () => {
  return fetch(`http://localhost:8088/avatars`).then((response) =>
    response.json()
  );
};

export const getCurrentUser = (id) => {
  return fetch(`http://localhost:8088/users/${id}`).then((response) =>
    response.json()
  );
};
export const getAllGenres = () => {
  return fetch(`http://localhost:8088/genres`).then((response) =>
    response.json()
  );
};

/* POST calls */
export const postNewUser = (userObject) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  }).then((res) => res.json());
};

export const getUserFromEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const searchMovies = (searchTerm) => {
  return fetch(
    `https://imdb-api.com/en/API/SearchMovie/${imdbAPIKey}/${searchTerm}`
  ).then((response) => response.json());
};

export const getCategories = () => {
  return fetch(`http://localhost:8088/categories`).then((response) =>
    response.json()
  );
};


export const getList = (listId) => {
  return fetch(
    `https://imdb-api.com/en/API/IMDbList/${imdbAPIKey}/${listId}`
  ).then((response) => response.json());
};

export const getActor = (actorId) => {
  return fetch(`https://imdb-api.com/en/API/Name/${imdbAPIKey}/${actorId}`).then(
    (response) => response.json()
  );
};

export const postGame = (gameObject) => {
  return fetch("http://localhost:8088/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameObject),
  }).then((res) => res.json());
};
export const putGame = (gameObject) => {
  return fetch(`http://localhost:8088/games/${gameObject?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameObject),
  }).then((res) => res.json());
};

export const getUserGames = (userId) => {
  return fetch(
    `http://localhost:8088/games?_sort=id&_order=desc&_expand=category&userId=${userId}`
  ).then((response) => response.json());
};
export const getUserGamesWithCategory = (userId) => {
  return fetch(
    `http://localhost:8088/games?_expand=category&userId=${userId}`
  ).then((response) => response.json());
};

export const getProject = (projectId) => {
  return fetch(
    `https://imdb-api.com/en/API/Title/${imdbAPIKey}/${projectId}`
  ).then((response) => response.json());
};

export const getWinners = () => {
  return fetch(`http://localhost:8088/winnerGifs`).then((response) => response.json())
}

export const getLosers = () => {
  return fetch(`http://localhost:8088/loserGifs`).then((response) => response.json())
}