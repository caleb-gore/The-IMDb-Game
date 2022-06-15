import { Navigate } from "react-router-dom"

export const Logout = () => {
    localStorage.removeItem("imdb_user")

    return  <Navigate to="/" replace={true} />
}