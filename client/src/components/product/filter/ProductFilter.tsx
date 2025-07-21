import { useEffect, useState } from "react";
import type { ProductsFilterProps } from "../../../types/product";
import "./ProductsFilter.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ArrowDownSquare, ArrowUpSquare } from "react-bootstrap-icons";

function ProductsFilter({ filters }: ProductsFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const {
    minPrice,
    minPriceChange,
    maxPrice,
    maxPriceChange,
    category,
    categoryChange,
    setSortByPrice,
    sortByPrice,
  } = filters;

  const resetFilters = () => {
    filters.productNameChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    minPriceChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    maxPriceChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    categoryChange("");

    setSortByPrice("");
  };

  return (
    <>
      <h3 className="mt-3 ms-2">Filtrer par :</h3>
      {isMobile && (
        <div className="text-center mb-3">
          <button
            className="show-filter-btn btn btn-outline-secondary btn-light w-25"
            type="button"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? <ArrowUpSquare /> : <ArrowDownSquare />}
          </button>
        </div>
      )}
      {(showFilters || !isMobile) && (
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
                  sortByPrice === "price-asc"
                    ? "text-primary fw-bold text-decoration-underline"
                    : ""
                }`}
                type="button"
                onClick={() => {
                  setSortByPrice("price-asc");
                }}
              >
                Prix croissant
              </button>

              <button
                className={`btn btn-link text-decoration-none text-reset p-0 mb-3 ${
                  sortByPrice === "price-desc"
                    ? "text-primary fw-bold text-decoration-underline"
                    : ""
                }`}
                type="button"
                onClick={() => {
                  setSortByPrice("price-desc");
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
                    onClick={() => categoryChange("")}
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
                    onClick={() => categoryChange("1")}
                  >
                    Figurines
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => categoryChange("2")}
                  >
                    Objets pratiques
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => categoryChange("3")}
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
