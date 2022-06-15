import { useNavigate } from "react-router-dom"

export const ReadyToPlay = () => {
    const navigate = useNavigate()
    return (
        <>
        <h1>Some Random placeholder Text</h1>
        <button onClick={
            () => {navigate("/game")}
        }>Lets Play!</button>
        </>
    )
}