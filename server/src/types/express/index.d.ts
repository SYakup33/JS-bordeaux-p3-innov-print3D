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
  namespace Express {
    export interface Request {
      product: {
        id: number;
        name: string;
        description: string;
        price: number;
        category_id: number;
      };
    }
  }
}
