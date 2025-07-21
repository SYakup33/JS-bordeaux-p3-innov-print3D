import { useState } from "react";
import { Cart3, PersonFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

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

  return (
    <header className="container mt-4 d-flex justify-content-end align-items-center mb-3">
      <nav className="d-flex align-items-center position-relative">
        <div className="d-flex align-items-center me-3">
          <button type="button" className="btn" onClick={onLogClick}>
            <PersonFill size={28} className="text-dark" />
            {isLogged && (
              <span className="ms-2 fw-medium text-muted">
                Bonjour, {currentUser?.firstname}
              </span>
            )}
          </button>
        </div>
        {showLogout && isLogged && (
          <div className="position-absolute top-100 end-50">
            {currentUser?.role === "admin" && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm mb-1"
                onClick={() => {
                  navigate("myaccount/admin");
                  setShowLogout(false);
                }}
              >
                Compte Admin
              </button>
            )}
            <button
              type="button"
              className="btn btn-outline-danger btn-sm "
              onClick={onLogout}
            >
              Déconnexion
            </button>{" "}
          </div>
        )}
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
