import { Navigate } from "react-router-dom"

export const Logout = () => {
    localStorage.removeItem("imdb_user")
    localStorage.removeItem("game_intro")

    return  <Navigate to="/" replace={true} />
}