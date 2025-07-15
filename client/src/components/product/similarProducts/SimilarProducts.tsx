import {
  CartPlusFill,
  Dash,
  Plus,
  StarFill,
  StarHalf,
  XSquareFill,
} from "react-bootstrap-icons";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { ProductType } from "../../../types/product";
import { ReadMore } from "../../ReadMore";
import "./SimilarProducts.css";

type SimilarProductsProps = {
  suggestions: ProductType[];
  addProduct: (product: ProductType, quantity: number) => void;
};

type quantityProductId = {
  [productId: number]: number;
};

function SimilarProducts({ suggestions, addProduct }: SimilarProductsProps) {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<quantityProductId>({});
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = (productId: number) => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setLoading(false);
      navigate(`/product/${productId}`);
    }, 1500);
  };

  const increaseQuantity = (producId: number) => {
    const currentQuantity = quantity[producId] ?? 1;
    setQuantity((prev) => ({
      ...prev,
      [producId]: currentQuantity + 1,
    }));
  };

  const decreaseQuantity = (productId: number) => {
    const currentQuantity = quantity[productId] ?? 1;
    if (currentQuantity > 1) {
      setQuantity((prev) => ({
        ...prev,
        [productId]: currentQuantity - 1,
      }));
    }
  };

  return (
    <>
      {Loading && (
        <div className="similar-products-loader position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-75">
          <div className="d-flex justify-content-center align-items-center bg-secondary bg-opacity-50 rounded-circle shadow-lg p-3">
            <div className="spinner-border text-light" />
          </div>
          <div className="text-light mt-4 fw-semibold fs-4 d-flex align-items-center gap-2">
            <small>Chargement en cours...</small>
          </div>
        </div>
      )}
      <section className="similar-products-container  my-5 py-4 rounded  mx-auto px-4">
        <h2 className="mb-4 pb-2 text-center fw-semibold">
          Vous aimerez aussi...
        </h2>
        {suggestions.length === 0 ? (
          <section className="container my-5 ">
            <div className="alert alert-info text-center" role="alert">
              Aucun produit similaire disponible
            </div>
          </section>
        ) : (
          <>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              className="similar-products"
              // navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 8000 }}
              breakpoints={{
                576: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {suggestions.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="card shadow-sm border-0 rounded-4 similar-products-cursor">
                    <img
                      src={product.images?.[0]}
                      className="card-img-top object-fit-cover similar-products-img"
                      alt={product.name}
                      onClick={() => handleNavigate(product.id)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && navigate(`product/${product.id}`)
                      }
                    />
                    <div className="card-body d-flex flex-column">
                      <h5
                        className="card-title mb-0 fs-6 fw-bold"
                        onClick={() => handleNavigate(product.id)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && navigate(`product/${product.id}`)
                        }
                      >
                        {product.name}
                      </h5>
                      <div className="mb-2">
                        {[...Array(4)].map((i) => (
                          <StarFill key={i} color="#f4c150" size={15} />
                        ))}
                        <StarHalf key="half" color="#f4c150" size={15} />
                      </div>
                      <div>
                        <span className="badge bg-secondary text-start py-2 mb-3">
                          {product.category_name}
                        </span>
                      </div>
                      <div className="overflow-auto similar-products-scrollbar small">
                        <ReadMore text={product.description} maxLength={50} />
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-semibold text-dark fs-5">
                          {product.price} €
                        </span>
                        {activeProduct === product.id ? (
                          <div className="d-flex align-items-center ">
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => decreaseQuantity(product.id)}
                            >
                              <Dash />
                            </button>

                            <small className="fs-5 mx-2 fw-semibold">
                              {quantity[product.id] || 1}
                            </small>

                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => increaseQuantity(product.id)}
                            >
                              <Plus />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                addProduct(product, quantity[product.id] || 1);
                                setQuantity((prev) => ({
                                  ...prev,
                                  [product.id]: 1,
                                }));
                                setActiveProduct(null);
                              }}
                              className="btn bg-success text-light fw-bold rounded btn-sm ms-3"
                            >
                              Ajouter
                            </button>

                            <button
                              type="button"
                              onClick={() => setActiveProduct(null)}
                              className="btn text-danger btn-sm"
                            >
                              <XSquareFill size={28} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm"
                            onClick={() => {
                              setActiveProduct(product.id);
                              console.log(product.id);
                            }}
                          >
                            <CartPlusFill size={28} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </section>
    </>
  );
}

export default SimilarProducts;
