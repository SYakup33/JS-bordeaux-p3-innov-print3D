import { useNavigate } from "react-router";
import "./CategoryProducts.css";

const categories = [
  { id: 1, name: "Figurines", icon: "🧝‍♂️" },
  { id: 2, name: "Dioramas", icon: "🏰" },
  { id: 3, name: "Accessoires", icon: "🔨" },
  { id: 4, name: "Autres", icon: "🧩" },
];

function CategoryProducts() {
  const navigate = useNavigate();

  return (
    <section className="category-modern-section py-5 mt-5">
      <div className="container">
        <h2 className="text-center text-light fw-bold mb-5 display-6">
          Choisis ton univers
        </h2>
        <div className="row g-4 justify-content-center">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              className="col-12 col-sm-6 col-md-3"
              onClick={() => navigate(`/products?category_id=${cat.id}`)}
            >
              <div className="card category-modern-card h-100 text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <div className="category-modern-icon mb-3">{cat.icon}</div>
                  <h5 className="fw-semibold">{cat.name}</h5>
                  <p className="text-muted small mb-0">Voir les créations</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryProducts;
