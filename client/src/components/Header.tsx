import { Cart3 } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

function Header() {
  const navigate = useNavigate();
  const { cartProducts } = useCart();
  const { user } = useUser();
  const userId = user?.userId;

  return (
    <>
      <div className="container mt-4">
        <header className="d-flex justify-content-end align-items-center mb-3">
          <button
            type="button"
            className="btn position-relative border-0 p-0 me-2 cursor-pointer"
            onClick={() => {
              navigate(`/cart/user/${userId}`);
            }}
          >
            <Cart3 size={28} className="text-dark" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartProducts.reduce((acc, p) => acc + p.quantity, 0)}
            </span>
          </button>
        </header>
      </div>
    </>
  );
}

export default Header;
