import { useEffect, useState } from "react";
import type { ProductType } from "../../types/product.ts";
import "./Product.css";
import { Dash, Plus, StarFill, StarHalf } from "react-bootstrap-icons";
import { useParams } from "react-router";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du produit");
        }
        const data: ProductType = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erreur:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  const rating = () => {
    const stars = [];

    for (let i = 0; i < 4; i++) {
      stars.push(<StarFill key={i} color="gold" size={20} />);
    }

    stars.push(<StarHalf key="half" color="gold" size={20} />);

    return stars;
  };

  return (
    <>
      <main className="container my-3">
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
          <article className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="fs-1 fw-semibold">{product?.name}</h1>
            <div className="mb-5">{rating()}</div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <p className="me-2 mb-0 fw-semibold">Quantité :</p>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm p-1"
                  onClick={() => ""}
                >
                  <Dash size={20} />
                </button>
                <span className="fs-5">1</span>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm p-1"
                  onClick={() => ""}
                >
                  <Plus size={20} />
                </button>
              </div>
              <h2 className="fs-1 fw-bold my-3">{product?.price} €</h2>
            </div>
            <button
              type="button"
              onClick={() => ""}
              className="btn my-5 py-4 fs-4 fw-bold w-75 product-cta-add-to-cart d-block"
            >
              Ajouter au panier
            </button>
            <p className="mt-5 lh-lg">
              {(product?.description?.length || 0) > 300
                ? `${product?.description.slice(0, 300)}... `
                : product?.description}
              {(product?.description?.length || 0) > 300 && (
                <a
                  href="#description"
                  className="ms-2 text-primary text-decoration-underline"
                >
                  Voir plus
                </a>
              )}
            </p>
          </article>
          <article className="mx-5">
            <h3 id="description" className="mx-auto my-5">
              Description complète
            </h3>
            <p className="lh-lg w-75">{product?.description}</p>
          </article>
        </div>
      </main>
    </>
  );
}

export default Product;
