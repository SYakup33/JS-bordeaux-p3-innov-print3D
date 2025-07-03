import { useState } from "react";
import { useNavigate } from "react-router";
import type { ProductsFilterProps } from "../../../types/product";
import "./ProductsFilter.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ProductsFilter({
  productName,
  productNameChange,
  suggestions,
  minPrice,
  minPriceChange,
  maxPrice,
  maxPriceChange,
  category,
  categoryChange,
  setOrder,
}: ProductsFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [activeOrder, setActiveOrder] = useState("");
  const navigate = useNavigate();
  const resetFilters = () => {
    productNameChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    minPriceChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    maxPriceChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    categoryChange("");

    setOrder("");
    setActiveOrder("");
  };

  const categorySelect = (value: string) => {
    categoryChange(value);
  };

  return (
    <>
      <input
        className="product-filter-search w-75 mx-auto mt-1"
        type="text"
        placeholder="Recherche par nom"
        value={productName ?? ""}
        onChange={productNameChange}
      />
      {suggestions.length > 0 && (
        <ul className="d-flex flex-column p-0 align-items-start">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="product-filter-li border-bottom border-1 border-black ms-5 p-2 w-75"
              onClick={() => navigate(`/products/${item.id}`)}
              onKeyDown={() => navigate(`/products/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-3 ms-2">Filtrer par :</h3>

      <div className="text-center mb-3">
        <button
          className="show-filter-btn btn btn-outline-secondary btn-light w-25"
          type="button"
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className={`bi bi-chevron-${showFilters ? "up" : "down"}`} />
        </button>
      </div>

      {showFilters && (
        <div className="d-flex ms-2 mb-4 flex-md-column">
          <div className="filter-prices d-flex flex-column me-4 mt-md-2">
            <h4 className="fw-bold">Prix</h4>
            <div className="d-flex align-items-center w-100 mt-1 mt-md-2">
              <p className="mt-2 me-1">De</p>
              <input
                className="w-50 mb-2"
                type="number"
                value={minPrice ?? ""}
                onChange={minPriceChange}
                min={0}
              />
              &nbsp;
              <p className="mt-2">€</p>
              <p className="mt-2 ms-2">à</p>
              <input
                className="w-50 mb-2 ms-1"
                type="number"
                value={maxPrice ?? ""}
                onChange={maxPriceChange}
                min={0}
              />
              &nbsp;
              <p className="mt-2">€</p>
            </div>
            <div className="d-flex flex-column align-items-start">
              <button
                className={`btn btn-link text-decoration-none text-reset p-0 mb-1 mt-md-2 ${
                  activeOrder === "price-asc"
                    ? "text-primary fw-bold text-decoration-underline"
                    : ""
                }`}
                type="button"
                onClick={() => {
                  setOrder("price-asc");
                  setActiveOrder("price-asc");
                }}
              >
                Prix croissant
              </button>

              <button
                className={`btn btn-link text-decoration-none text-reset p-0 mb-3 ${
                  activeOrder === "price-desc"
                    ? "text-primary fw-bold text-decoration-underline"
                    : ""
                }`}
                type="button"
                onClick={() => {
                  setOrder("price-desc");
                  setActiveOrder("price-desc");
                }}
              >
                Prix décroissant
              </button>
            </div>
          </div>
          <div className="d-flex row border-start border-black mx-2" />
          <div className="me-2 w-50">
            <h4 className="fw-bold mb-md-2">Catégories</h4>
            <div className="dropdown mt-3">
              <button
                className="product-filter-dropdown btn dropdown-toggle w-100 border-black"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {category === ""
                  ? "Tous les produits"
                  : category === "1"
                    ? "Figurines"
                    : category === "2"
                      ? "Objets pratiques"
                      : category === "3"
                        ? "Jeux"
                        : "Tous les produits"}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => categorySelect("")}
                  >
                    Tous les produits
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => categorySelect("1")}
                  >
                    Figurines
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => categorySelect("2")}
                  >
                    Objets pratiques
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => categorySelect("3")}
                  >
                    Jeux
                  </button>
                </li>
              </ul>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-outline-danger mt-2"
                type="button"
                onClick={resetFilters}
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsFilter;
