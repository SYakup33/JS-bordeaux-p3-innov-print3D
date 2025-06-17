export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  images: string;
};

export type CardProps = {
  products: ProductType[] | null;
};
