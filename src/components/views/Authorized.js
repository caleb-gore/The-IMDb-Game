import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("imdb_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/${location.search}`}
            replace
            state={{ location }} />
    }
}

