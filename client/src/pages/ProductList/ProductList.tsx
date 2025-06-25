import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import "rc-pagination/assets/index.css";
import ProductCard from "../../components/product/ProductCard.tsx";
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`,
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des produits");
        }
        const data: ProductType[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center cards-title">
        <h1>TOUS LES PRODUITS</h1>
      </div>
      <div className="container">
        <div className="row g-4">
          {currentProducts?.map((product) => (
            <div key={product.id} className="col-6 col-md-4">
              <ProductCard products={product} />
            </div>
          ))}
        </div>
      </div>
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
