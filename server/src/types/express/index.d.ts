export type { Product, Image, Category };

declare global {
  namespace Express {
    export interface Request {
      product: Product;
      image: Image;
      category: Category;
    }
  }
}
