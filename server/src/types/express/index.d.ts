// to make the file a module and avoid the TypeScript error
export type {};

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
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
    }
  }
}
