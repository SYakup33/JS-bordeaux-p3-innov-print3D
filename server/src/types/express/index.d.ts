export type { Product };

declare global {
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

  type User = {
    id: number;
    firstname: string;
    lastname: string;
    street?: string;
    city?: string;
    zip_code?: string;
    email: string;
    phone: string;
    password: string;
    role: "client" | "admin";
    created_at: Date;
  };

  type MyPayload = JwtPayload & { sub: string; role: "client" | "admin" };
  namespace Express {
    export interface Request {
      auth: MyPayload;
    }
  }
}
