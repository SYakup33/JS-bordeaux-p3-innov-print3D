export type { Product };

declare global {
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
