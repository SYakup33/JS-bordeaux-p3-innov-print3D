import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
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

  const fetchProducts = async (
    productName?: string | null,
    minPrice?: number | null,
    maxPrice?: number | null,
    category?: string | null,
  ) => {
    const params = new URLSearchParams();
    if (productName !== null && productName !== undefined)
      params.append("name", String(productName));
    if (minPrice !== null && minPrice !== undefined)
      params.append("minPrice", String(minPrice));
    if (maxPrice !== null && maxPrice !== undefined)
      params.append("maxPrice", String(maxPrice));
    if (category) params.append("categoryId", String(category));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/search?${params.toString()}`,
      );
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des produits");
      }
      console.log(response);
      const data: ProductType[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center cards-title">
        <h1>TOUS LES PRODUITS</h1>
      </div>
      <main id="cards-main-content">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            fetchProducts(productName, minPrice, maxPrice, category);
          }}
        >
          <ProductsFilter
            productName={productName}
            productNameChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setProductName(e.target.value ? e.target.value : null);
            }}
            minPrice={minPrice}
            minPriceChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMinPrice(e.target.value ? Number(e.target.value) : null);
            }}
            maxPrice={maxPrice}
            maxPriceChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMaxPrice(e.target.value ? Number(e.target.value) : null);
            }}
            category={category}
            categoryChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCategory(e.target.value || null);
            }}
          />
          <button type="button">Réinitialiser les filtres</button>
          <button type="submit">Appliquer les filtres</button>
        </form>
        <section className="container">
          <div className="row g-4">
            {currentProducts?.map((product) => (
              <div key={product.id} className="col-6 col-md-4">
                <ProductCard products={product} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <div className="cards-pagination-container d-flex justify-content-center mt-5 mb-5">
        <Pagination
          current={currentPage}
          total={products?.length}
          pageSize={productPerPage}
          onChange={(page: number) => {
            setCurrentPage(page);
          }}
          itemRender={(
            page: number,
            type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
            element: React.ReactNode,
          ) => {
            if (type === "prev") {
              return <span className="cards-pagination-btn">&laquo;</span>;
            }
            if (type === "next") {
              return <span className="cards-pagination-btn">&raquo;</span>;
            }
            if (type === "page") {
              const isActive = currentPage === page;
              return (
                <span
                  className={`cards-pagination-btn ${
                    isActive ? "cards-pagination-btn-active" : ""
                  }`}
                >
                  {page}
                </span>
              );
            }
            return element;
          }}
        />
      </div>
    </>
  );
}

export default ProductList;
