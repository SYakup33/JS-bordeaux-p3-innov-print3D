import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ProductType } from "../../../types/product";
import { SliderProducts } from "../SliderProducts";

function SimilarProducts() {
  const { id } = useParams();
  const [suggestedProducts, setSuggestedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/product/${id}`,
        );
        const products = await response.json();
        setSuggestedProducts(products.suggestions || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuggestions();
  }, [id]);

  return (
    <section className="container">
      <SliderProducts
        title="Vous aimerez aussi ..."
        productsList={suggestedProducts}
      />
    </section>
  );
}

export default SimilarProducts;
