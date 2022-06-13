/* GET calls */

export const getAllAvatars = () => {
    return fetch(`http://localhost:8088/avatars`)
            .then((response) => response.json())
}

export const getCurrentUser = (id) => {
    return fetch(`http://localhost:8088/users/${id}`)
            .then((response) => response.json())
}
export const getAllGenres = () => {
    return fetch(`http://localhost:8088/genres`)
      .then((response) => response.json())
}

/* POST calls */
export const postNewUser = (userObject) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      })
        .then((res) => res.json())
}

export const getUserFromEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
}

export const searchMovies = (searchTerm) => {
    return fetch(`https://imdb-api.com/en/API/SearchMovie/k_xujmt7ax/${searchTerm}`)
    .then((response) => response.json())
}