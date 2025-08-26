import { useEffect, useRef, useState } from "react";
import {
  Box,
  BoxArrowRight,
  BoxSeam,
  Cart3,
  Envelope,
  House,
  InfoSquare,
  PersonBadge,
  PersonFill,
  Receipt,
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
  const { cartProducts, fetchCart } = useCart();
  const [showLogout, setShowLogout] = useState(false);
  const { currentUser, isLogged, logout } = useAuth();
  const { unreadOrdersCount, fetchUnreadOrders } = useOrdersNotifs();
  const personRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (personRef.current && !personRef.current.contains(e.target as Node)) {
        setShowLogout(false);
      }
    };
    if (showLogout) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [showLogout]);

  const onLogClick = () => {
    if (isLogged) {
      setShowLogout((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  const onCartClick = () => {
    if (isLogged) {
      navigate("cart");
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

  const getInitials = (firstname: string, lastname: string) => {
    return `${firstname[0] ?? ""}${lastname?.[0] ?? ""}`.toUpperCase();
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
          <div className="col-4 d-flex justify-content-center">
            <div className="d-flex align-items-center gap-md-5 gap-3">
              <Link
                to="/about"
                className="fw-bold text-decoration-none text-dark"
              >
                <span className="d-none d-md-inline nowrap">À propos</span>
                <InfoSquare size={24} className="d-inline d-md-none" />
              </Link>
              <Link
                to="/contact"
                className="fw-bold text-decoration-none text-dark"
              >
                <span className="d-none d-md-inline nowrap">
                  Nous contacter
                </span>
                <Envelope size={24} className="d-inline d-md-none" />
              </Link>
            </div>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <nav className="d-flex align-items-center position-relative">
              <div ref={personRef} className="position-relative me-3">
                <button
                  id="header-person-button"
                  type="button"
                  className="btn d-flex align-items-center"
                  onClick={onLogClick}
                >
                  {(!isLogged || window.innerWidth > 768) && (
                    <PersonFill size={28} className="text-dark" />
                  )}
                  {isLogged && (
                    <>
                      <span className="ms-2 fw-medium text-muted d-none d-md-inline nowrap">
                        Bonjour, {currentUser?.firstname}
                      </span>

                      <span className="d-inline d-md-none">
                        <button
                          type="button"
                          className="header-initials-circle d-flex align-items-center justify-content-center text-light"
                          onClick={() => {
                            navigate(`${currentUser?.id}/me`);
                            setShowLogout(false);
                          }}
                        >
                          {getInitials(
                            currentUser?.firstname || "",
                            currentUser?.lastname || "",
                          )}
                        </button>
                      </span>
                    </>
                  )}
                </button>
                {showLogout && isLogged && (
                  <div className="show-more-840 d-md-flex flex-column position-absolute bg-white border rounded-3 shadow p-3 border border-2 header-person-modal ">
                    <div className="d-flex align-items-center mb-4">
                      <div className="rounded-circle text-white d-flex align-items-center justify-content-center me-2 header-person-circle ">
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
                      <div className="">
                        <button
                          type="button"
                          className="btn header-items-hover border w-100 mb-2 d-flex gap-2 align-items-center justify-content-start position-relative "
                          onClick={() => {
                            onAdminOrdersClick();
                            fetchUnreadOrders();
                          }}
                        >
                          <Tools />
                          <span className="nowrap">Gestion des commandes</span>
                          {unreadOrdersCount > 0 && (
                            <span className="d-flex align-items-center justify-content-center rounded-pill bg-danger header-new-order text-light small">
                              {unreadOrdersCount}
                            </span>
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn border header-items-hover w-100 mb-2 d-flex gap-2 align-items-center justify-content-start position-relative"
                          onClick={() => {
                            onAdminproductClick();
                          }}
                        >
                          <BoxSeam />
                          <span>Gestion des produits</span>
                        </button>
                      </div>
                    )}

                    {showLogout && currentUser?.role !== "admin" && (
                      <button
                        type="button"
                        className="btn border header-items-hover w-100 d-flex gap-2 mb-2 align-items-center justify-content-start"
                        onClick={() => {
                          navigate(`/myaccount/orders/${currentUser?.id}`);
                          setShowLogout(false);
                        }}
                      >
                        <Box />
                        <span>Mes commandes</span>
                      </button>
                    )}
                    <div>
                      <button
                        type="button"
                        className="btn border header-items-hover w-100 d-flex gap-2 mb-2 align-items-center justify-content-start"
                        onClick={() => {
                          navigate(`${currentUser?.id}/myProfile`);
                          setShowLogout(false);
                        }}
                      >
                        <PersonBadge />
                        <span>Mon profil</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger text-light w-100 d-flex gap-1 align-items-center justify-content-start"
                        onClick={onLogout}
                      >
                        <BoxArrowRight />
                        <span className="hover-label">Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="show-under-840 position-fixed bottom-0 start-0 w-100 d-flex justify-content-around align-items-center bg-white px-3 py-3 shadow-lg border-top z-3">
                  {isLogged && currentUser?.role === "admin" && (
                    <>
                      <button
                        type="button"
                        className="btn bg-light rounded-circle d-flex align-items-center justify-content-center position-relative shadow-sm header-icon-mobile-height"
                        onClick={() => {
                          onAdminOrdersClick();
                          fetchUnreadOrders();
                        }}
                      >
                        <Tools size={24} />
                        {unreadOrdersCount > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {unreadOrdersCount}
                          </span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate("/admin/products")}
                        className="btn bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm header-icon-mobile-height"
                      >
                        <BoxSeam size={24} />
                      </button>
                    </>
                  )}

                  {isLogged ? (
                    <>
                      {isLogged && currentUser?.role === "client" && (
                        <>
                          <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="btn bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm header-icon-mobile-height"
                          >
                            <House size={24} />
                          </button>
                          <button
                            type="button"
                            className="btn bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm header-icon-mobile-height"
                            onClick={() => {
                              navigate(`/myaccount/orders/${currentUser?.id}`);
                              setShowLogout(false);
                            }}
                          >
                            <Receipt size={24} />
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => navigate(`/${currentUser?.id}/me`)}
                        className="btn bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm header-icon-mobile-height"
                      >
                        <PersonBadge size={24} />
                      </button>
                      <button
                        type="button"
                        onClick={onLogout}
                        className="btn bg-danger rounded-circle d-flex align-items-center justify-content-center shadow-sm text-white header-icon-mobile-height"
                      >
                        <BoxArrowRight size={24} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="btn bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm header-icon-mobile-height"
                      >
                        <House size={24} />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="btn bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm header-icon-mobile-height"
                      >
                        <Box size={24} />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="btn bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm header-icon-mobile-height"
                      >
                        <PersonBadge size={24} />
                      </button>
                    </>
                  )}
                </div>
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
