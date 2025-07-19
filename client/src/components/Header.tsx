import { useState } from "react";
import { BoxArrowRight, Cart3, PersonFill, Tools } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const navigate = useNavigate();
  const { cartProducts } = useCart();
  const [showLogout, setShowLogout] = useState(false);
  const { currentUser, isLogged, logout } = useAuth();

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

  return (
    <header className="container mt-4 d-flex justify-content-end align-items-center mb-3">
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
              className="position-absolute  bg-white border rounded-4 shadow p-3 border"
              style={{ zIndex: 1050, minWidth: "280px" }}
            >
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                  style={{ width: 40, height: 40 }}
                >
                  <strong>{currentUser?.firstname[0]}</strong>
                </div>
                <div>
                  <div className="fw-semibold">{currentUser?.firstname}</div>
                  <div className="text-muted small">{currentUser?.email}</div>
                </div>
              </div>

              {currentUser?.role === "admin" && (
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm w-100 mb-2 d-flex gap-1 align-items-center justify-content-center"
                  onClick={onAdminOrdersClick}
                >
                  <Tools />
                  <span>Gérer les commandes</span>
                </button>
              )}

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
    </header>
  );
}

export default Header;
