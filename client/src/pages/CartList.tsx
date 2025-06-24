import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cart from "../components/carts/Cart";
import type { CartProduct } from "../types/cart";

function CartList() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cart/${userId}`,
        );

        if (!response.ok)
          throw new Error("Erreur lors du chargement du panier");

        const data = await response.json();

        setCartProducts(data);
      } catch (error) {
        console.error("Erreur lors du chargement du panier");
      }
    };
    fetchCart();
  }, [userId]);

  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
      if (newQuantity < 1) return;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${userId}/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        },
      );
      if (!response.ok) throw new Error("Erreur lors de la mise à jour");
      setCartProducts((prev) =>
        prev.map((p) =>
          p.productId === productId ? { ...p, quantity: newQuantity } : p,
        ),
      );
    } catch {
      alert("Impossible de modifier la quantité");
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${userId}/${productId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      setCartProducts((prev) => prev.filter((p) => p.productId !== productId));
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    } catch {
      alert("Impossible de supprimer le produit");
    }
  };

  const checkProduct = (productId: number) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  return (
    <Cart
      products={cartProducts}
      selectedProducts={selectedProducts}
      checkProduct={checkProduct}
      updateQuantity={updateQuantity}
      deleteProduct={deleteProduct}
      checkAll={() => setSelectedProducts(cartProducts.map((p) => p.productId))}
      uncheckAll={() => setSelectedProducts([])}
    />
  );
}

export default CartList;
