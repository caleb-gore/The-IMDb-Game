/* imports */
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserFromEmail } from "../../managers/APIManager";
import "./Login.css";

/* component */
export const Login = () => {
  /* use state */
  const [email, set] = useState("j.sparrow@pirates.com");

  /* navigate */
  const navigate = useNavigate();

  /* function called on submit */
  const handleLogin = (e) => {
    e.preventDefault();

    return getUserFromEmail(email /* line 11 */) /* API line 31 */
      .then((foundUsers) => {
        /* check if user exists in database */
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "imdb_user",
            JSON.stringify({
              id: user.id,
            })
          );

          navigate("/dashboard");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  /* JSX */
  return (
    <main className="container--login">
      {/* Form */}
      <Container >
        <Form className="mt-3" onSubmit={handleLogin /* line 17 */}>
          {/* Title */}
          <h1>The IMDb Game</h1>
          <h2>Please sign in</h2>

          {/* Email Address */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="inputEmail"> Email address </Form.Label>
            <Form.Control
              type="email"
              value={email /* line 11 */}
              onChange={(evt) => set(evt.target.value) /* line 11 */}
              placeholder="marilynmonroe@hollywood.star"
              required
              autoComplete="off"
              autoFocus
              />
          </Form.Group>

          {/* Submit Button */}
          <Form.Group className="mb-3">
            <Button type="submit" variant="warning">Sign in</Button>
          </Form.Group>
        </Form>
      </Container>

      {/* Registration button */}
      <section className="link--register">
        <Link to="/register" >Not a member yet?</Link>
      </section>
    </main>
  );
};
