import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import type { CartContextType, CartProduct } from "../types/cart";
import { useAuth } from "./AuthContext";

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const { currentUser, token } = useAuth();
  const userId = currentUser?.id;

  const fetchCart = useCallback(async () => {
    try {
      if (userId) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cart/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const cart = await response.json();

        setCartProducts(cart);
      } else {
        setCartProducts(JSON.parse(localStorage.getItem("cart") || "[]"));
      }
    } catch (err) {
      toast.error("Erreur lors du chargement du panier.");
    }
  }, [userId, token]);

  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });

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
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCartProducts((prev) => prev.filter((p) => p.productId !== productId));
    } catch {
      toast.error("Impossible de supprimer le produit.");
    }
  };

  const addToCart = async (productId: number, productName: string) => {
    try {
      if (userId) {
        const isInCart = cartProducts
          .map((p) => p.productId)
          .includes(productId);
        if (isInCart) {
          await deleteProduct(productId);
          toast.info(`${productName} retiré du panier.`);
        } else {
          await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${userId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
          });
          toast.success(`${productName} ajouté au panier !`);
        }
        await fetchCart();
      } else {
        const storedCart: { productId: number; quantity: number }[] =
          JSON.parse(localStorage.getItem("cart") || "[]");

        const updateCart = storedCart
          .map((p) => p.productId)
          .includes(productId)
          ? storedCart.filter((p) => p.productId !== productId)
          : [...storedCart, { productId, quantity: 1 }];

        localStorage.setItem("cart", JSON.stringify(updateCart));
        await fetchCart();
      }
    } catch (err) {
      toast.error("Erreur lors de l'ajout ou suppression du produit.");
    }
  };

  useEffect(() => {
    const localCartToServer = async () => {
      if (!userId) return;
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

        for (const item of storedCart) {
          await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${userId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          });
        }

        localStorage.removeItem("cart");
        await fetchCart();
      } catch (err) {
        console.error("Erreur sync panier local au serveur", err);
      }
    };
    localCartToServer();
  }, [userId, fetchCart]);

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
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
};
