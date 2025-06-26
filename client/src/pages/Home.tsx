import { useNavigate } from "react-router";
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <button
        type="button"
        onClick={() => navigate("/products")}
        className="btn"
        style={{
          backgroundColor: "var(--btn-cta-home-color)",
          color: "var(--font-secondary-color)",
        }}
      >
        Parcourir les créations
      </button>
    </>
  );
}

export default Home;
