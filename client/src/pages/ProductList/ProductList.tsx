import Pagination from "rc-pagination";
import { useCallback, useEffect, useState } from "react";
import "rc-pagination/assets/index.css";
import ProductCard from "../../components/product/card/ProductCard.tsx";
import ProductsFilter from "../../components/product/filter/ProductFilter.tsx";
import { useProductSearch } from "../../contexts/ProductSearchContext.tsx";
import type { ProductType } from "../../types/product.ts";
import "./ProductList.css";
import { useLocation, useNavigate, useSearchParams } from "react-router";

function ProductList() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 9;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const {
    productName,
    suggestions,
    fetchSuggestions,
    setProductName,
    resetSearch,
  } = useProductSearch();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [minPrice, setMinPrice] = useState<number | null>(
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null,
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null,
  );
  const [category, setCategory] = useState<string | null>(
    searchParams.get("category_id") || null,
  );
  const [sortByPrice, setSortByPrice] = useState<string | null>(
    searchParams.get("sort") || null,
  );

  const fetchAndSortProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams(searchParams.toString());

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/search?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des produits");
      }

      let products: ProductType[] = await response.json();

      const sortBy = searchParams.get("sort");
      if (sortBy === "price-asc") {
        products = products.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        products = products.sort((a, b) => b.price - a.price);
      }

      setProducts(products);
      setCurrentPage(1);
    } catch (error) {
      console.error("Erreur:", error);
      setProducts([]);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchAndSortProducts();
  }, [fetchAndSortProducts]);

  useEffect(() => {
    if (location.pathname === "/products") {
      resetSearch();
    }
  }, [location.pathname, resetSearch]);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
    fetchSuggestions(value);

    if (value) {
      searchParams.set("name", value);
    } else {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  };

  const filters = {
    productName,
    productNameChange: onSearchInputChange,
    suggestions,
    minPrice,
    minPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value ? Number(e.target.value) : null;
      setMinPrice(value);
      if (value !== null) {
        searchParams.set("minPrice", String(value));
      } else {
        searchParams.delete("minPrice");
      }
      setSearchParams(searchParams);
    },
    maxPrice,
    maxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value ? Number(e.target.value) : null;
      setMaxPrice(value);
      if (value !== null) {
        searchParams.set("maxPrice", String(value));
      } else {
        searchParams.delete("maxPrice");
      }
      setSearchParams(searchParams);
    },
    category,
    categoryChange: (value: string) => {
      setCategory(value || null);
      if (value) {
        searchParams.set("category_id", value);
      } else {
        searchParams.delete("category_id");
      }
      setSearchParams(searchParams);
    },
    sortByPrice,
    setSortByPrice: (value: string | null) => {
      setSortByPrice(value);
      if (value) {
        searchParams.set("sort", value);
      } else {
        searchParams.delete("sort");
      }
      setSearchParams(searchParams);
    },
  };

  return (
    <>
      <div className="d-flex align-items-center cards-title">
        <h1>TOUS LES PRODUITS</h1>
      </div>
      <div className="d-flex justify-content-start w-100 mb-md-3 ">
        <div className="w-100 d-flex flex-column align-items-end justify-content-md-end product-filter-searchbar">
          <input
            className="w-50 mt-1"
            type="text"
            placeholder="Recherche par nom"
            value={productName ?? ""}
            onChange={filters.productNameChange}
          />
          {suggestions.length > 0 && (
            <ul className="d-flex flex-column p-0 align-items-center w-50">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="product-filter-li border-bottom border-1 border-black mx-auto p-2 w-100"
                  onClick={() => navigate(`/product/${item.id}`)}
                  onKeyDown={() => navigate(`/product/${item.id}`)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>{" "}
      </div>

      <section className="d-flex flex-column flex-md-row">
        <form
          className="d-flex flex-column col-md-3"
          onSubmit={(e) => {
            e.preventDefault();
            fetchAndSortProducts();
          }}
        >
          <ProductsFilter filters={filters} />
        </form>

        <section className="col-md-9 px-3">
          <div className="row g-4">
            {currentProducts && currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product.id} className="col-6 col-md-4">
                  <ProductCard products={product} />
                </div>
              ))
            ) : (
              <h1>Aucun produit trouvé</h1>
            )}
          </div>

          <div className="cards-pagination-container d-flex justify-content-center mt-5 mb-5">
            <Pagination
              current={currentPage}
              total={products?.length}
              pageSize={productPerPage}
              onChange={(page: number) => setCurrentPage(page)}
              itemRender={(page, type, element) => {
                if (type === "prev")
                  return <span className="cards-pagination-btn">&laquo;</span>;
                if (type === "next")
                  return <span className="cards-pagination-btn">&raquo;</span>;
                if (type === "page") {
                  const isActive = currentPage === page;
                  return (
                    <span
                      className={`cards-pagination-btn ${isActive ? "cards-pagination-btn-active" : ""}`}
                    >
                      {page}
                    </span>
                  );
                }
                return element;
              }}
            />
          </div>
        </section>
      </section>
    </>
  );
}

export default ProductList;
