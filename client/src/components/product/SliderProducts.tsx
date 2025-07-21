import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type { ProductType } from "../../types/product";

import "./productCardStyle/ProductCardStyle.css";
import ProductCardStyle from "./productCardStyle/ProductCardStyle";

type SliderProductsProps = {
  title: string;
  productsList: ProductType[];
};

export function SliderProducts({ title, productsList }: SliderProductsProps) {
  return (
    <section className="container my-5 py-4 px-4 rounded">
      <h2 className="mb-4 text-center fw-semibold">{title}</h2>

      {productsList.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Aucun produit à afficher
        </div>
      ) : (
        <Swiper
          modules={[Pagination, Autoplay]}
          className="product-card-style"
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }}
          breakpoints={{
            425: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {productsList.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCardStyle product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
