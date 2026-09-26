import { Link } from "react-router";

export function meta() {
  return [
    { title: "Mon profil | SportSee" },
  ];
}

export default function Profile() {
  return (
    <main>
      <h1>Mon profil</h1>

      <Link to="/dashboard">Retour au dashboard</Link>
    </main>
  );
}