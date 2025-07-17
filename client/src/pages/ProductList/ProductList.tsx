import Pagination from "rc-pagination";
import { useCallback, useEffect, useState } from "react";
import "rc-pagination/assets/index.css";
import ProductCard from "../../components/product/card/ProductCard.tsx";
import ProductsFilter from "../../components/product/filter/ProductFilter.tsx";
import type { ProductType } from "../../types/product.ts";
import "./ProductList.css";

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
  const [productName, setProductName] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [sortByPrice, setSortByPrice] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<ProductType[]>([]);

  const fetchAndSortProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (productName) params.append("name", productName);
      if (minPrice !== null) params.append("minPrice", String(minPrice));
      if (maxPrice !== null) params.append("maxPrice", String(maxPrice));
      if (category) params.append("category_id", category);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/search?${params.toString()}`,
      );
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des produits");
      }
      let products: ProductType[] = await response.json();

      if (sortByPrice === "price-asc") {
        products = products.sort((a, b) => a.price - b.price);
      } else if (sortByPrice === "price-desc") {
        products = products.sort((a, b) => b.price - a.price);
      }

      setProducts(products);
      setCurrentPage(1);
    } catch (error) {
      console.error("Erreur:", error);
      setProducts([]);
    }
  }, [productName, minPrice, maxPrice, category, sortByPrice]);

  useEffect(() => {
    fetchAndSortProducts();
  }, [fetchAndSortProducts]);

  const suggestionProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value || null);

    if (value && products) {
      const filtered = products
        .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };
  const filters = {
    productName,
    productNameChange: suggestionProductName,
    suggestions,
    minPrice,
    minPriceChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setMinPrice(e.target.value ? Number(e.target.value) : null),
    maxPrice,
    maxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setMaxPrice(e.target.value ? Number(e.target.value) : null),
    category,
    categoryChange: (value: string) => setCategory(value || null),
    setSortByPrice,
    sortByPrice,
  };

  return (
    <>
      <div className="d-flex align-items-center cards-title">
        <h1>TOUS LES PRODUITS</h1>
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
        <section className="container">
          <div className="row g-4">
            {currentProducts && currentProducts?.length > 0 ? (
              currentProducts?.map((product) => (
                <div key={product.id} className="col-12 col-md-4">
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
              onChange={(page: number) => {
                setCurrentPage(page);
              }}
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
