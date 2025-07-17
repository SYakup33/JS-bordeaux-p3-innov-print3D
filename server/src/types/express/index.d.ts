export type { Product };

declare global {
  type User = {
    id: number;
    firstname: string;
    lastname: string;
    street: string;
    zip_code: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    hashed_password: req.body.hashed_password;
    role: "client" | "admin";
    created_at?: Date;
  };
  type Product = {
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
  type ProductFilters = {
    name?: string;
    category_id?: string;
    minPrice?: number;
    maxPrice?: number;
  };

  type MyPayload = JwtPayload & { sub: string; role: "client" | "admin" };
  namespace Express {
    export interface Request {
      auth: MyPayload;
    }
  }
}
