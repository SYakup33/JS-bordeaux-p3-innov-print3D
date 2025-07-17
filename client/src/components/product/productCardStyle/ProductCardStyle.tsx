import { useEffect, useState } from "react";
import {
  CartPlusFill,
  Dash,
  PlusLg,
  StarFill,
  StarHalf,
  Trash,
  XLg,
} from "react-bootstrap-icons";
import { useCart } from "../../../context/CartContext";
import { useCustomNavigat } from "../../../context/Navigatecontext";
import type { ProductType } from "../../../types/product";
import { ReadMore } from "../../ReadMore";
import "./ProductCardStyle.css";

type ProductsStyleProps = {
  product: ProductType;
};

function ProductCardStyle({ product }: ProductsStyleProps) {
  const { handleNavigate } = useCustomNavigat();
  const { addProduct, updateQuantity, cartProducts, deleteProduct } = useCart();

  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const isInnCart = cartProducts.find((p) => p.productId === product.id);
  const quantity = isInnCart?.quantity || 1;

  const handleIncrease = () => {
    if (isInnCart) {
      updateQuantity(product.id, quantity + 1);
    } else {
      addProduct(product, 1);
    }
  };

  useEffect(() => {
    if (activeProduct && !isHovering) {
      const timer = setTimeout(() => {
        setActiveProduct(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeProduct, isHovering]);

  return (
    <article className="card shadow-sm border-0 rounded-4 product-card-style-height">
      <button
        type="button"
        onClick={() => handleNavigate(`/product/${product.id}`)}
        className="btn p-0 border-0 bg-transparent"
      >
        <img
          src={product.images?.[0]}
          className="card-img-top object-fit-cover rounded-bottom rounded-4 product-card-style-img"
          alt={product.name}
        />
      </button>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-0 fs-5 fw-bold mb-1">{product.name}</h5>

        <div className="mb-3">
          {[...Array(4)].map((_, i) => (
            <StarFill key={`${product.id}${i}`} color="#f4c150" size={15} />
          ))}
          <StarHalf color="#f4c150" size={15} />
        </div>

        <div>
          <span className="badge bg-secondary py-2 mb-2">
            {product.category_name}
          </span>
        </div>

        <div className="overflow-auto product-card-style-scrollbar ">
          <ReadMore text={product.description} maxLength={50} />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fw-semibold text-dark fs-5 mt-2 product-card-style-price">
            {product.price} €
          </span>

          <div className="d-flex align-items-center">
            {activeProduct === product.id ? (
              <div
                className="d-flex align-items-center gap-lg-3 gap-2 rounded-4 px-1 py-1 product-card-style-modal"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {quantity > 1 ? (
                  <button
                    type="button"
                    className="btn btn-sm bg-white text-dark border-0 rounded-circle d-flex align-items-center justify-content-center shadow-sm product-card-style-modal-btn "
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    <Dash size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm bg-danger text-white border-0 rounded-circle d-flex align-items-center justify-content-center shadow-sm product-card-style-modal-btn "
                    onClick={() => {
                      deleteProduct(product.id);
                      setActiveProduct(null);
                    }}
                  >
                    <Trash size={18} />
                  </button>
                )}

                <small className="fs-6 fw-semibold px-1">{quantity}</small>

                <button
                  type="button"
                  className="btn btn-sm bg-white text-dark border-0 rounded-circle d-flex align-items-center justify-content-center shadow-sm product-card-style-modal-btn "
                  onClick={handleIncrease}
                >
                  <PlusLg size={18} />
                </button>

                <button
                  type="button"
                  className="btn btn-sm  text-danger "
                  onClick={() => {
                    setActiveProduct(null);
                  }}
                >
                  <XLg size={18} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center product-card-style-cart-btn"
                onClick={() => {
                  addProduct(product, 1);
                  setActiveProduct(product.id);
                }}
              >
                <CartPlusFill size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCardStyle;
