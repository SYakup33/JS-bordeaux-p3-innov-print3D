type CartProduct = {
    productId: number;
    productName: string;
    description: string;
    price: number;
    categoryName: string;
    quantity: number;
    images: string[];
  };

  type CartProps = {
    products: CartProduct[];
    selectedProducts: number[];
    checkProduct: (productId: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    deleteProduct: (productId: number) => void;
    checkAll: () => void;
    uncheckAll: () => void;
  };