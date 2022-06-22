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
    `https://imdb-api.com/en/API/SearchMovie/k_xujmt7ax/${searchTerm}`
  ).then((response) => response.json());
};

export const getCategories = () => {
  return fetch(`http://localhost:8088/categories`).then((response) =>
    response.json()
  );
};

export const getList = (listId) => {
  return fetch(
    `https://imdb-api.com/en/API/IMDbList/k_xujmt7ax/${listId}`
  ).then((response) => response.json());
};

export const getActor = (actorId) => {
  return fetch(`https://imdb-api.com/en/API/Name/k_xujmt7ax/${actorId}`).then(
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
    `http://localhost:8088/games?_expand=category&_userId=${userId}`
  ).then((response) => response.json());
};
export const getUserGamesWithCategory = (userId) => {
  return fetch(
    `http://localhost:8088/games?_expand=category&userId=${userId}`
  ).then((response) => response.json());
};

export const getProject = (projectId) => {
  return fetch(
    `https://imdb-api.com/en/API/Title/k_xujmt7ax/${projectId}`
  ).then((response) => response.json());
};
