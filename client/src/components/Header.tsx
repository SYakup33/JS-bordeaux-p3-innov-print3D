import { Cart3 } from "react-bootstrap-icons";
import { Outlet, useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-4">
        <header className="d-flex justify-content-end align-items-center mb-3">
          <button
            type="button"
            className="btn position-relative border-0 p-0 me-2 cursor-pointer"
            onClick={() => {
              navigate("/cart/user/3");
            }}
          >
            <Cart3 size={28} className="text-dark" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              0
            </span>
          </button>
        </header>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Header;
