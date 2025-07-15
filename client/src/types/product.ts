export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  images: string[];
  category_name?: string;
};

export type ProductsFilterProps = {
  filters: {
    productName: string | null;
    productNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    suggestions: ProductType[];
    minPrice: number | null;
    minPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxPrice: number | null;
    maxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    category: string | null;
    categoryChange: (value: string) => void;
    setSortByPrice: (order: string) => void;
    sortByPrice: string | null;
  };
};

export type quantityProductId = {
  [productId: number]: number;
};
