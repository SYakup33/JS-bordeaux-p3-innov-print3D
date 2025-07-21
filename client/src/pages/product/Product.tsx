import { useEffect, useState } from "react";
import type { ProductType } from "../../types/product.ts";
import "./Product.css";
import { Dash, Plus, StarFill, StarHalf } from "react-bootstrap-icons";
import { useParams } from "react-router";
import SimilarProducts from "../../components/product/similarProducts/SimilarProducts.tsx";
import { useCart } from "../../context/CartContext.tsx";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { cartProducts, addToCart, updateQuantity } = useCart();

  const fullStars = ["full-1", "full-2", "full-3", "full-4"];

  const addProduct = async () => {
    if (!product?.id) return;

    const isInCart = cartProducts.find((p) => p.productId === Number(id));

    if (isInCart) {
      updateQuantity(product?.id, isInCart.quantity + quantity);
    } else {
      addToCart(product?.id, product?.name, quantity);
    }
    setQuantity(1);
  };

  const changeDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const renderDescription = (isMobile = false) => {
    if (!product?.description) return null;

    return (
      <div className={`${isMobile ? "d-lg-none" : "d-none d-lg-block"} mt-4`}>
        <p className="lh-lg">
          {showFullDescription
            ? product.description
            : `${product.description.slice(0, 300)}...`}
        </p>
        {product.description.length > 300 && (
          <button
            type="button"
            onClick={changeDescription}
            className="btn btn-link p-0 text-primary text-decoration-underline"
          >
            {showFullDescription ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/product/${id}`,
        );

        if (!response.ok) {
          console.error("Erreur lors du chargement du produit");
          setProduct(null);
          return;
        }

        const product: ProductType = await response.json();
        setProduct(product);
      } catch (error) {
        console.error("Erreur", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <section className="container mw-100">
        <div className="w-100 product-top-bar" />
        <div className="row">
          <article className="col-md-6 mb-4">
            <div
              id="carouselExampleFade"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {product?.images?.map((imgPath) => (
                  <div
                    className={`carousel-item ${product.images[0] === imgPath ? "active" : ""}`}
                    key={imgPath}
                  >
                    <img
                      src={imgPath}
                      alt={`Cliché du ${product?.name}`}
                      className="product-img d-block img-fluid rounded"
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </article>

          <article className="col-md-6 d-flex flex-column justify-content-center pe-5">
            <h1 className="fs-1 fw-semibold">{product?.name}</h1>
            <h2 className="product-badge badge bg-secondary d-flex justify-content-center py-2">
              {product?.category_name}
            </h2>
            <div className="mb-5">
              {fullStars.map((stars) => (
                <StarFill key={stars} color="gold" size={20} />
              ))}
              <StarHalf color="gold" size={20} />
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <p className="me-2 mb-0 fw-semibold">Quantité :</p>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm p-1"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                >
                  <Dash size={20} />
                </button>
                <span className="fs-5"> {quantity} </span>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm p-1"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={20} />
                </button>
              </div>
              <h2 className="fs-1 fw-bold my-3">{product?.price} €</h2>
            </div>
            <button
              type="button"
              onClick={addProduct}
              className="my-5 py-4 fs-4 fw-bold w-75 mx-auto rounded-4 product-cta-add-to-cart border-0"
            >
              Ajouter au panier
            </button>
            {renderDescription(false)}
          </article>
          <div className="col-12">{renderDescription(true)}</div>
        </div>
      </section>
      <section>
        <SimilarProducts />
      </section>
    </>
  );
}

export default Product;
