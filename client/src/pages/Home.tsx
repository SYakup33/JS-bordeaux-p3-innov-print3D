import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  return (
    <>
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
