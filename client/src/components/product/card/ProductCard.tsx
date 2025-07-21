import "../../../assets/styles/_variables.css";
import "./ProductCard.css";
import type { ProductType } from "../../../types/product.ts";
import ProductCardStyle from "../productCardStyle/ProductCardStyle.tsx";
import "./ProductCard.css";

interface ProductCardProps {
  products: ProductType;
}

function ProductCard({ products }: ProductCardProps) {
  return (
    <>
      <div className=" d-flex flex-column">
        <ProductCardStyle product={products} />
      </div>
    </>
  );
}

export default ProductCard;
