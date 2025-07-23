export type SelectedProductsType = {
  productId: number;
  price: number;
  quantity: number;
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
