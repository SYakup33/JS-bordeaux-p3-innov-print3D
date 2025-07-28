import { useEffect, useState } from "react";
import type { ProductType } from "../../../types/product";
import { SliderProducts } from "../SliderProducts";

function TrendProducts() {
  const [trendProducts, setTrendProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/moments`,
        );
        const products = await response.json();
        setTrendProducts(products || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <section className="container home-margin-top">
      <SliderProducts
        title="Les produits du moment"
        productsList={trendProducts}
      />
    </section>
  );
}

export default TrendProducts;
