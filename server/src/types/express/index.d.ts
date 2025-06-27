export type { Product };

declare global {
  namespace Express {
    export interface Request {
      product: {
        id: number;
        name: string;
        description: string;
        price: number;
        images: string[];
        category_id: number;
      };
    }
  }
}
