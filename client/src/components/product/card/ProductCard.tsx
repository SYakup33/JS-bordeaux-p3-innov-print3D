import "../../../assets/styles/_variables.css";
import { CartPlusFill, Heart } from "react-bootstrap-icons";
import type { ProductType } from "../../../types/product.ts";
import "./ProductCard.css";
import { useNavigate } from "react-router";

interface ProductCardProps {
  products: ProductType;
}

function ProductCard({ products }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <>
      <div key={products?.id} className="card rounded-3 cards-card">
        {products ? (
          <button
            onClick={() => {
              navigate(`/products/${products.id}`);
            }}
            type="button"
            className="btn p-0 border-0 bg-transparent"
          >
            <img
              src={products.images[0]}
              alt={`Cliché du ${products.name}`}
              className="w-100 rounded-top-3 object-fit-cover card-card-img"
            />
          </button>
        ) : (
          <p>Pas d'image disponible</p>
        )}
        <div className="card-body d-flex flex-column justify-content-between cards-card-footer p-2">
          <h3 className="card-title">{products?.name}</h3>
          <div className="d-flex justify-content-between align-items-center mt-auto cards-card-price-icons">
            <h4 className="card-price fw-bold mb-0">{products?.price}€</h4>
            <div className="d-flex">
              <button type="button" className="btn p-0 border-0 bg-transparent">
                <Heart size={20} className="product-card-icon me-2" />
              </button>
              <button
                type="button"
                className="btn p-0 border-0 bg-transparent cards-card-cart"
              >
                <CartPlusFill size={20} className="product-card-icon heart" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductCard;
