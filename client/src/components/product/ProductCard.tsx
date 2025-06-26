import "../../../assets/styles/_variables.css";
import type { ProductType } from "../../types/product.ts";
import "./ProductCard.css";

interface ProductCardProps {
  products: ProductType;
}

function ProductCard({ products }: ProductCardProps) {
  return (
    <>
      <div key={products?.id} className="card rounded-3 cards-card">
        {products ? (
          <button type="button" className="btn p-0 border-0 bg-transparent">
            <img
              src={products.images[0]}
              alt={`Cliché du ${products.name}`}
              className="w-100 rounded-top-3 object-fit-cover card-card-img"
            />
          </button>
        ) : (
          <p>Pas d'image disponible</p>
        )}
        <div className="card-body d-flex flex-column justify-content-between cards-card-footer">
          <h3 className="card-title">{products?.name}</h3>
          <div className="d-flex justify-content-between align-items-center mt-auto cards-card-price-icons">
            <h4 className="fw-bold mb-0">{products?.price} €</h4>
            <div className="d-flex align-items-center gap-3">
              <button type="button" className="btn p-0 border-0 bg-transparent">
                <i className="bi bi-heart cards-card-heart" />
              </button>
              <button
                type="button"
                className="btn p-0 border-0 bg-transparent cards-card-cart"
              >
                <i className="bi bi-cart-plus-fill" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductCard;
