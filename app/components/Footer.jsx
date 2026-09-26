import "../styles/footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__copyright">
          <span>© Sportsee</span>
          <span>Tous droits réservés</span>
        </div>

        <div className="footer__links">
          <a href="#">Conditions générales</a>
          <a href="#">Contact</a>

          <span className="footer__icon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
    </footer>
  );
}