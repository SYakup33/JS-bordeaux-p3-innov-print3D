/// <reference types="vite/client" />
// This provides types for the Vite-injected env variables on import.meta.env
// See https://vite.dev/guide/features.html#client-types

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  images: string[];
};

export type CardProps = {
  products: ProductType[] | null;
};
