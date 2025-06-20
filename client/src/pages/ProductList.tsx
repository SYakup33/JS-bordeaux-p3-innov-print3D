import { useEffect, useState } from "react";
import Card from "../components/products/Card.tsx";
import type { ProductType } from "../types/vite-env.d.ts";

function ProductList() {
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`,
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des produits");
        }
        const data: ProductType[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return <Card products={products} />;
}

export default ProductList;
