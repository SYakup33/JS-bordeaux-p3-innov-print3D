export type { ProductList };

declare global {
  namespace Express {
    export interface Request {
      ProductList: {
        id: number;
        name: string;
        description: string;
        price: number;
        category_id: number;
      };
    }
  }
}
