import { useNavigate } from "react-router";
import "./CategoryProducts.css";
import {
  Controller,
  HousesFill,
  PersonArmsUp,
  ShieldFillCheck,
} from "react-bootstrap-icons";

const catTest = [
  { id: 1, name: "Figurines", icon: <PersonArmsUp size={60} /> },
  { id: 2, name: "Objets pratiques", icon: <HousesFill size={60} /> },
  { id: 3, name: "Jeux", icon: <Controller size={60} /> },
  { id: 4, name: "Divers", icon: <ShieldFillCheck size={60} /> },
];

function CategoryProducts() {
  const navigate = useNavigate();
  return (
    <section className="category-modern-section py-5 px-2 mt-5">
      <div className="container mb-3">
        <h2 className="text-center text-light fw-bold mb-5 display-6">
          Choisis ton univers
        </h2>
        <div className="row g-4 justify-content-center">
          {catTest.map((cat) => (
            <div
              key={cat.id}
              className="col-12 col-sm-6 col-md-3 category-modern-card"
              onClick={() => navigate(`/products?category_id=${cat.id}`)}
              onKeyDown={() => navigate(`/products?category_id=${cat.id}`)}
            >
              <div className="card h-100 text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                  <div className=" mb-3">{cat.icon}</div>
                  <h5 className="fw-semibold">{cat.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryProducts;
