import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import type { CartContextType, CartProduct } from "../types/cart";
import { useUser } from "./UserContext";

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const { user } = useUser();
  const userId = user?.userId;

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${userId}`,
      );

      const data = await response.json();

      setCartProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Erreur lors du chargement du panier.");
    }
  }, [userId]);

  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
      if (newQuantity < 1) return;
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${userId}/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        },
      );

      setCartProducts((prev) =>
        prev.map((p) =>
          p.productId === productId ? { ...p, quantity: newQuantity } : p,
        ),
      );
    } catch {
      toast.error("Impossible de modifier la quantité.");
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${userId}/${productId}`,
        {
          method: "DELETE",
        },
      );
      setCartProducts((prev) => prev.filter((p) => p.productId !== productId));
    } catch {
      toast.error("Impossible de supprimer le produit.");
    }
  };

  const addToCart = async (productId: number, productName: string) => {
    try {
      const isInCart = cartProducts.map((p) => p.productId).includes(productId);

      if (isInCart) {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/cart/${userId}/${productId}`,
          {
            method: "DELETE",
          },
        );
        toast.info(`${productName} retiré du panier.`);
      } else {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cart/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, quantity: 1 }),
          },
        );

        if (!res.ok) {
          throw new Error();
        }

        toast.success(`${productName} ajouté au panier !`);
      }

      fetchCart();
    } catch (err) {
      toast.error("Erreur lors de l'ajout ou suppression du produit.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        fetchCart,
        addToCart,
        updateQuantity,
        deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("erreur");
  }
  return context;
};
