import { useRef, useState } from "react";
import {
  BoxArrowRight,
  BoxSeam,
  Cart3,
  Envelope,
  PersonBadge,
  PersonFill,
  Tools,
} from "react-bootstrap-icons";

import { Link, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useOrdersNotifs } from "../../contexts/adminOrdersNotifications";
import "./Header.css";
import logo from "/img/icons/lnnovPrintLogo.png";

function Header() {
  const navigate = useNavigate();
  const { cartProducts } = useCart();
  const [showLogout, setShowLogout] = useState(false);
  const { currentUser, isLogged, logout } = useAuth();
  const { unreadOrdersCount, fetchUnreadOrders } = useOrdersNotifs();
  const logoutRef = useRef<HTMLDivElement | null>(null);

  const onLogClick = () => {
    if (isLogged) {
      setShowLogout((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  const onCartClick = () => {
    const userId = currentUser?.id;

    if (isLogged) {
      navigate(`/cart/${userId}`);
    } else {
      toast.warning("Veuillez vous connecter pour accéder au panier", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const onLogout = () => {
    logout();
    setShowLogout(false);
    navigate("/");
  };

  const onAdminOrdersClick = () => {
    navigate("/admin/orders");
    setShowLogout(false);
  };

  const onAdminproductClick = () => {
    navigate("/admin/products");
    setShowLogout(false);
  };

  return (
    <header className="fixed-top bg-white shadow-sm py-3 px-4 z-10">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-4 d-flex align-items-center">
            <Link to="/" className="header-logo">
              <img src={logo} alt="logo InnovPrint3D" className="img-fluid" />
            </Link>
          </div>
          <div className="col-4 text-center">
            <h5 className="mb-0 fw-medium">
              <Link
                to="/contact"
                className="fw-bold text-decoration-none text-dark d-none d-md-inline"
              >
                Nous contacter
              </Link>
              <Link
                to="/contact"
                className="fw-bold text-decoration-none text-dark d-inline d-md-none"
              >
                <Envelope size={24} />
              </Link>
            </h5>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <nav className="d-flex align-items-center position-relative">
              <div className="position-relative me-3">
                <button
                  type="button"
                  className="btn d-flex align-items-center"
                  onClick={onLogClick}
                >
                  <PersonFill size={28} className="text-dark" />
                  {isLogged && (
                    <span className="ms-2 fw-medium text-muted">
                      Bonjour, {currentUser?.firstname}
                    </span>
                  )}
                </button>
                {showLogout && isLogged && (
                  <div
                    ref={logoutRef}
                    className="position-absolute bg-white border rounded-4 shadow p-3 border header-person-modal"
                  >
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2 header-person-circle ">
                        <strong>{currentUser?.firstname[0]}</strong>
                      </div>
                      <div>
                        <div className="fw-semibold">
                          {currentUser?.firstname}
                        </div>
                        <div className="text-muted small">
                          {currentUser?.email}
                        </div>
                      </div>
                    </div>
                    {currentUser?.role === "admin" && (
                      <>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm w-100 mb-2 d-flex gap-2 align-items-center justify-content-center position-relative"
                          onClick={() => {
                            onAdminOrdersClick();
                            fetchUnreadOrders();
                          }}
                        >
                          <Tools />
                          <span>Gérer les commandes</span>{" "}
                          {unreadOrdersCount > 0 && (
                            <small className="d-flex align-items-center justify-content-center rounded-pill bg-danger header-new-order text-light">
                              {unreadOrdersCount}
                            </small>
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm w-100 mb-2 d-flex gap-2 align-items-center justify-content-center position-relative"
                          onClick={() => {
                            onAdminproductClick();
                          }}
                        >
                          <BoxSeam />
                          <span>Gestion des produits</span>
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm w-100 d-flex gap-2 mb-2 align-items-center justify-content-center"
                      onClick={() => {
                        navigate(`${currentUser?.id}/me`);
                        setShowLogout(false);
                      }}
                    >
                      <PersonBadge />
                      <span>Mon profil</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm w-100 d-flex gap-1 align-items-center justify-content-center"
                      onClick={onLogout}
                    >
                      <BoxArrowRight />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="btn position-relative border-0 p-0 me-2 cursor-pointer"
                onClick={onCartClick}
              >
                <Cart3 size={28} className="text-dark" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartProducts.reduce((acc, p) => acc + p.quantity, 0)}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
