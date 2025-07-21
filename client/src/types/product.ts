export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  images: Image[];
  category_name?: string;
  trend_products: string;
};

export type Image = {
  id: number;
  path: string;
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

export type ProductSearchContextType = {
  productName: string;
  setProductName: (value: string) => void;
  suggestions: ProductType[];
  setSuggestions: (suggestions: ProductType[]) => void;
  fetchSuggestions: (searchValue: string) => Promise<void>;
  clearSuggestions: () => void;
  resetSearch: () => void;
};

export type AddProductProps = {
  productDetails: {
    name: string;
    description: string;
    price: number;
    category_id: number;
  };
  onSubmit: (formData: FormData) => Promise<{ success: boolean }>;
  onSuccess?: () => void;
};

export type ModifyProductProps = {
  searchBar: {
    productName: string;
    suggestions: { id: number; name: string }[];
    productNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  productDetails: ProductType | null;
  onFetchProductDetails: (id: number) => void;
  onSubmit: (formData: FormData, productId: number) => void;
  onDelete: (id: number) => void;
};
