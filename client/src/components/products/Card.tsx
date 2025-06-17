import { useState } from "react";
import "../../assets/styles/_variables.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import type { CardProps } from "../../types/ClientType.ts";
import btn_ajouter_panier from "../../../public/img/icons/btn_ajouter_panier.png"
import coeur_favori_inactif from "../../../public/img/icons/coeur_favori_inactif.png"

function Card({ products }: CardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 9;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <>
      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "var(--secondary-color)",
          fontSize: "var(--font-size-h1: 3rem)",
          height: "100px",
          padding: "10px 0px 0px 10px",
          marginBottom: "20px",
        }}
      >
        <h1>TOUS LES PRODUITS</h1>
      </div>
      <div
        className="d-flex justify-content-center flex-wrap gap-4"
        style={{
          color: "var(--primary-color)",
          padding: "1% 1% 2% 23%",
        }}
      >
        {currentProducts?.map((product) => {
          return (
            <div
              key={product.id}
              className="card rounded-3"
              style={{
                backgroundColor: "var(--tertiary-color)",
                width: "24rem",
                maxWidth: "100%",
              }}
            >
              {product ? (
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-100 rounded-top-3"
                    style={{ height: "70vh", objectFit: "cover" }}
                  />
                </button>
              ) : (
                <p>Pas d'image disponible</p>
              )}
              <div className="card-body d-flex flex-column justify-content-between">
                <h3
                  className="card-title"
                  style={{
                    fontSize: "var(--font-size-paragraph)",
                    paddingTop: "15px",
                  }}
                >
                  {product.name}
                </h3>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <p
                    className="fw-bold mb-0"
                    style={{
                      fontSize: "var(--font-size-paragraph)",
                      padding: "15px 0px 15px 0px",
                    }}
                  >
                    {product.price} €
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <button
                      type="button"
                      className="btn p-0 border-0 bg-transparent"
                    >
                      <img
                        src={coeur_favori_inactif}
                        alt="coeur_favori_inactif"
                        className="d-flex justify-content-end"
                        style={{
                          width: "2rem",
                          height: "2rem",
                        }}
                      />
                    </button>
                    <button
                      type="button"
                      className="btn p-0 border-0 bg-transparent"
                    >
                      <img
                        src={btn_ajouter_panier}
                        alt="ajouter_au_panier"
                        className="d-flex justify-content-end"
                        style={{
                          width: "2rem",
                          height: "2rem",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        current={currentPage}
        total={products?.length}
        pageSize={productPerPage}
        onChange={(page) => {
          setCurrentPage(page);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        itemRender={(page, type) => {
          const baseButtonStyle = {
            padding: "5px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            margin: "15px 4px 0 4px",
            cursor: "pointer",
            color: "var(--primary-color)",
          };
          const activeButtonStyle = {
            ...baseButtonStyle,
            backgroundColor: "var(--secondary-color)",
            borderColor: "var(--primary-color)",
            color: "var(--font-secondary-color)",
          };
          if (type === "prev") {
            return <span style={baseButtonStyle}>&laquo;</span>;
          }
          if (type === "next") {
            return <span style={baseButtonStyle}>&raquo;</span>;
          }
          if (type === "page") {
            const isActive = currentPage === page;
            return (
              <span style={isActive ? activeButtonStyle : baseButtonStyle}>
                {page}
              </span>
            );
          }
        }}
      />
      <style>
        {`
          .rc-pagination-item-active {
            border-color: transparent;
            box-shadow: none;
          }
          .rc-pagination-item:focus {
            border-color: transparent;
            box-shadow: none;
          }
          .rc-pagination-item:hover {
            border-color: transparent;
            box-shadow: none;
          }
        `}
      </style>
    </>
  );
}
export default Card;
