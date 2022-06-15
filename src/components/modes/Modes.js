import { useNavigate } from "react-router-dom"

export const Modes = () => {
    const navigate = useNavigate()
    return <>
    <h3>Select Play Mode</h3>
    <button type="button" onClick={() => navigate("/categories")}>Normal Mode</button>
    <button>Timed Mode</button>
    <button>Challenge Mode</button>

    </>
}