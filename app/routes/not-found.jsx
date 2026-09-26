import { Link } from "react-router";

export default function NotFound() {
  return (
    <main>
      <h1>404</h1>

      <p>Cette page n'existe pas.</p>

      <Link to="/">Retour à l'accueil</Link>
    </main>
  );
}