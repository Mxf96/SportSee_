import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/useLogin";
import "../styles/login.scss";

export function meta() {
  return [
    { title: "Connexion | SportSee" },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const success = await login(username, password);

    if (success) {
      navigate("/dashboard");
    }
  }

  return (
    <main className="login">
      <section className="login__left">
        <div className="login__logo">
          <span className="login__logo-icon">▥</span>
          <span>SPORTSEE</span>
        </div>

        <div className="login__card">
          <h1 className="login__title">
            Transformez
            <br />
            vos stats en résultats
          </h1>

          <h2 className="login__subtitle">Se connecter</h2>

          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__field">
              <label htmlFor="username">Adresse email</label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="login__field">
              <label htmlFor="password">Mot de passe</label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error && <p className="login__error">{error}</p>}

            <button
              className="login__button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <button className="login__forgot" type="button">
            Mot de passe oublié ?
          </button>
        </div>
      </section>

      <section className="login__background" aria-hidden="true" />
    </main>
  );
}