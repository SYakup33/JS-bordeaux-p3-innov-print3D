import { Instagram } from "react-bootstrap-icons";
import { Link } from "react-router";
import logo from "/img/icons/lnnovPrintLogo.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer border-top p-4 mt-3">
      <div className="container">
        <div className="row align-items-center justify-content-between mb-3">
          <div className="col-6 col-md-4">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="logo InnovPrint3D" className="img-fluid" />
            </Link>
          </div>
          <div className="col-6 col-md-4 d-flex flex-column align-items-end">
            <Link
              to="/about"
              className="fw-bold text-decoration-none text-white mb-2"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="fw-bold text-decoration-none text-white"
            >
              Nous contacter
            </Link>
          </div>
        </div>
        <div className="text-center text-white mt-4">
          <p className="mb-3">
            <strong>Suivez-nous :</strong>
          </p>
          <p className="mb-3">
            <a
              href="https://www.instagram.com/innovprint3_d/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white py-4"
            >
              <Instagram size={34} />
            </a>
          </p>
          <p className="small">© 2025 InnovPrint3D. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
