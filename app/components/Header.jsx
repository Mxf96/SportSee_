import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import "../styles/header.scss";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="header">
      <Link to="/dashboard" className="header__logo">
        <span className="header__logo-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>

        <span className="header__logo-text">SPORTSEE</span>
      </Link>

      <nav className="header__nav">
        <Link to="/dashboard" className="header__link">
          Dashboard
        </Link>

        <Link to="/profile" className="header__link">
          Mon profil
        </Link>

        <span className="header__separator"></span>

        <button type="button" className="header__logout" onClick={handleLogout}>
          Se déconnecter
        </button>
      </nav>
    </header>
  );
}