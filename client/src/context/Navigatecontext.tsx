import { type ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import "../components/product/productCardStyle/ProductCardStyle.css";

type NavigateContextType = {
  costomNavigate: (path: string) => void;
};

const NavigateContext = createContext<NavigateContextType | null>(null);

export function NavigateProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const costomNavigate = (path: string) => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 500);
  };

  return (
    <NavigateContext.Provider value={{ costomNavigate }}>
      {children}

      {loading && (
        <div className="product-card-style-loader position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-75">
          <div className="d-flex justify-content-center align-items-center bg-secondary bg-opacity-50 rounded-circle shadow-lg p-3">
            <div className="spinner-border text-light" />
          </div>
          <div className="text-light mt-4 fw-semibold fs-4 d-flex align-items-center gap-2">
            <p>Chargement en cours...</p>
          </div>
        </div>
      )}
    </NavigateContext.Provider>
  );
}

export function useCustomNavigat() {
  const context = useContext(NavigateContext);
  if (!context) {
    throw new Error("useNavigate doit être dans un NavigateProvider");
  }
  return context;
}
