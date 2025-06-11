export type { ProductList, Image, Category };

declare global {
  namespace Express {
    export interface Request {
      productList: ProductList;
      image: Image;
      category: Category;
    }
  }
}
