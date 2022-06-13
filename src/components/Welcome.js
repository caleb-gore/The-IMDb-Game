import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Welcome = () => {
   


    return <>
    <h1>The IMDb Game</h1>
    <Link to="/home">Play</Link>
    <button type="button">Rules</button>
    </>
}