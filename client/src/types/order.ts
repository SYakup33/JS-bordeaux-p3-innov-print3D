export type SelectedProductsType = {
  productId: number;
  price: number;
  quantity: number;
};

export type AdminOrderProduct = {
  productId: number;
  productName: string;
  quantity: number;
  image: string;
  unitPrice: number;
};

export type AdminOrder = {
  orderId: number;
  createdAt: Date;
  status: "en préparation" | "expédiée" | "livrée" | "annulée" | string;
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  zip_code: string;
  country: string;
  email: string;
  phone: string;
  products: AdminOrderProduct[];
};

export type UserOrderProduct = {
  productId: number;
  productName: string;
  quantity: number;
  image: string;
  unitPrice: number;
};

export type UserOrder = {
  orderId: number;
  createdAt: Date;
  status: "en préparation" | "expédiée" | "livrée" | "annulée" | string;
  products: UserOrderProduct[];
};
