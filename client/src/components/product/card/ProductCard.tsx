import "../../../assets/styles/_variables.css";
import "./ProductCard.css";
import { CartDash, CartPlusFill, Heart } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { useCart } from "../../../context/CartContext.tsx";
import type { ProductType } from "../../../types/product.ts";

interface ProductCardProps {
  products: ProductType;
}

function ProductCard({ products }: ProductCardProps) {
  const { addToCart, cartProducts } = useCart();
  const isInCart = cartProducts.map((p) => p.productId).includes(products.id);

  const navigate = useNavigate();
  return (
    <>
      <article key={products?.id} className="card rounded-3 cards-card">
        {products ? (
          <button
            onClick={() => {
              navigate(`/product/${products.id}`);
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
                onClick={() => addToCart(products.id, products.name, 1)}
              >
                {isInCart ? (
                  <CartDash size={20} />
                ) : (
                  <CartPlusFill size={20} className="product-card-icon heart" />
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
export default ProductCard;
