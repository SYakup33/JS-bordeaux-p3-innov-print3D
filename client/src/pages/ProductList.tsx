import { useEffect, useState } from "react";
import Card from "../components/products/Card.tsx";
import type { ProductType } from "../types/vite-env.d.ts";

function Products() {
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => response.json())
      .then((data: ProductType[]) => {
        setProducts(data);
      });
  }, []);
  return (
    <>
      <Card products={products} />
    </>
  );
}

export default Products;
