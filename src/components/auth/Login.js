/* imports */
import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { getUserFromEmail } from "../../managers/APIManager";
import "./Login.css"

/* component */
export const Login = () => {
    /* use state */
    const [email, set] = useState("j.sparrow@pirates.com")
    
    /* navigate */
    const navigate = useNavigate()

    /* function called on submit */
    const handleLogin = (e) => {
        e.preventDefault()

        return getUserFromEmail(email)
            .then(foundUsers => {
                /* check if user exists in database */
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("imdb_user", JSON.stringify({
                        id: user.id,
                    }))

                    navigate("/dashboard")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    /* JSX */
    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>The IMDb Game</h1>
                    <h2>Please sign in</h2>
          
                    {/* Email Address */}          
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="marilynmonroe@hollywood.star"
                            required autoFocus />
                    </fieldset>

                    {/* Submit Button */}
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>

            {/* Registration button */}
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

