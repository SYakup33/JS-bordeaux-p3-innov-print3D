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
  const [SuggestedProducts, setSuggestedProducts] = useState<ProductType[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart, updateQuantity, cartProducts } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/product/${id}`,
        );

        if (!response.ok) {
          console.error("Erreur lors du chargement du produit");
          setProduct(null);
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

  useEffect(() => {
    if (!id) return;

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/product/${id}/suggestions`,
        );
        const data = await response.json();

        setSuggestedProducts(data.SuggestedProducts || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuggestions();
  }, [id]);

  const addProduct = async (product: ProductType, quantity: number) => {
    if (!product) return;
    const isInCart = cartProducts.find((p) => p.productId === product.id);
    if (isInCart) {
      await updateQuantity(product.id, isInCart.quantity + quantity);
    } else {
      addToCart(product.id, product.name, quantity);
    }
    setQuantity(1);
  };

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
              {[...Array(4)].map((i) => (
                <StarFill key={i} color="gold" size={20} />
              ))}
              <StarHalf key="half" color="gold" size={20} />
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
                <span className="fs-5">{quantity} </span>
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
              onClick={() => product && addProduct(product, quantity)}
              className="my-5 py-4 fs-4 fw-bold w-75 mx-auto product-cta-add-to-cart"
            >
              Ajouter au panier
            </button>
            <p className="mt-5 lh-lg d-none d-lg-block">
              {(product?.description?.length || 0) > 300
                ? `${product?.description.slice(0, 300)}... `
                : product?.description}
              {(product?.description?.length || 0) > 300 && (
                <a
                  href={`#${product?.name}`}
                  className="ms-2 text-primary text-decoration-underline"
                >
                  Voir plus
                </a>
              )}
            </p>
          </article>
          <article className="mx-5">
            <h3 id={product?.name} className="mx-auto my-5">
              Description complète
            </h3>
            <p className="lh-lg w-75">{product?.description}</p>
          </article>
        </div>
      </section>
      <section>
        <SimilarProducts
          suggestions={SuggestedProducts}
          addProduct={addProduct}
        />
      </section>
    </>
  );
}

export default Product;
