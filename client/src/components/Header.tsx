import { Cart3, PersonFill } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import { useCart } from "../contexts/CartContext";

function Header() {
  const navigate = useNavigate();
  const { cartProducts } = useCart();
  const { id } = useParams();
  const userId = Number(id ?? 1);

  return (
    <header className="container mt-4 d-flex justify-content-end align-items-center mb-3">
      <button
        type="button"
        className="btn position-relative border-0 p-0 me-2 cursor-pointer"
        onClick={() => {
          navigate("/myaccount/admin");
        }}
      >
        <PersonFill size={28} />
      </button>
      <button
        type="button"
        className="btn position-relative border-0 p-0 me-2 cursor-pointer"
        onClick={() => {
          navigate(`/cart/${userId}`);
        }}
      >
        <Cart3 size={28} className="text-dark" />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartProducts.reduce((acc, p) => acc + p.quantity, 0)}
        </span>
      </button>
    </header>
  );
}

export default Header;
