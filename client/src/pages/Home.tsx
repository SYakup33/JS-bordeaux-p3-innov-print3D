import { useNavigate } from "react-router";
import TrendProducts from "../components/product/MomentProducts/MomentProducts";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/products")}
        className="btn cart-header-title "
        style={{
          backgroundColor: "var(--btn-cta-home-color)",
          color: "var(--font-secondary-color)",
        }}
      >
        Parcourir les créations
      </button>
      <TrendProducts />
    </>
  );
}

export default Home;
