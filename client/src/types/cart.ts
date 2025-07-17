export type CartProduct = {
  productId: number;
  productName: string;
  description: string;
  price: number;
  categoryName: string;
  quantity: number;
  images: string[];
};

export type CartContextType = {
  cartProducts: CartProduct[];
  fetchCart: () => void;
  addToCart: (productId: number, productName: string, quantity: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  deleteProduct: (productId: number) => void;
};

export type Message = { text: string };
