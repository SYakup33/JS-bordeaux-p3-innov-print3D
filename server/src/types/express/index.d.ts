export type { Product };

declare global {
  type product = {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    category_id: number;
  };
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
  namespace Express {
    export interface Request {}
  }
}
