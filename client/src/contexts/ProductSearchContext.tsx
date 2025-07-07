import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { ProductSearchContextType, ProductType } from "../types/product";

const ProductSearchContext = createContext<ProductSearchContextType | null>(
  null,
);

export const ProductSearchProvider = ({
  children,
}: { children: ReactNode }) => {
  const [productName, setProductName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ProductType[]>([]);
  const fetchSuggestions = useCallback(async (searchValue: string) => {
    try {
      setProductName(searchValue);

      if (!searchValue) {
        setSuggestions([]);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
      );
      const products: ProductType[] = await response.json();

      const filtered = products
        .filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(0, 5);

      setSuggestions(filtered);
    } catch (err) {
      console.error("Erreur lors de la recherche des produits.");
    }
  }, []);

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const resetSearch = useCallback(() => {
    setProductName("");
    setSuggestions([]);
  }, []);

  return (
    <ProductSearchContext.Provider
      value={{
        productName,
        setProductName,
        suggestions,
        fetchSuggestions,
        clearSuggestions,
        resetSearch,
      }}
    >
      {children}
    </ProductSearchContext.Provider>
  );
};

export const useProductSearch = () => {
  const context = useContext(ProductSearchContext);
  if (!context) {
    throw new Error(
      "useProductSearch doit être utilisé dans un <ProductSearchProvider>",
    );
  }
  return context;
};
