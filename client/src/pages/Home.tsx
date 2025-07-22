import { useNavigate } from "react-router";
import CategoryProducts from "../components/product/filter/CategoryProducts";
import TrendProducts from "../components/product/trendProducts/TrendProducts";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>
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
        <CategoryProducts />
      </div>
      <TrendProducts />
    </>
  );
}

export default Home;
