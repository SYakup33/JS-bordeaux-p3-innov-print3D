export type { Product };

declare global {
  type CartProduct = {
    productId: number;
    productName: string;
    description: string;
    price: number;
    categoryName: string;
    quantity: number;
    images: string[];
  };
  type OrderProduct = {
    product_id: number;
    quantity: number;
    unit_price: number;
  };
  type product = {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
  };
  type ProductFilters = {
    name?: string;
    category_id?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  namespace Express {
    export interface Request {}
  }
}
