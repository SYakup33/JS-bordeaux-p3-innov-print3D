import { useEffect, useState } from "react";

interface CartWithProductsProps {
  user_id: number;
  product_id: number;
  quantity: number;
  product_name: string;
  price: number;
  description: string;
  image_path: string;
  firstname: string;
}

interface Cart {
  success: boolean;
  data: CartWithProductsProps[];
  totalProducts: number;
  totalQuantity: number;
  totalPrice: number;
  userId: number;
}

function Cart() {
  const [cart, setCart] = useState<CartWithProductsProps[]>([]);

  const userId = 4;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cart/user/${userId}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const cartData = await response.json();
        console.log("✅ Données du panier:", cartData);
        setCart(cartData.data);
      } catch (error) {
        console.error("❌ Erreur lors du fetch:", error);
      }
    };

    fetchCart();
  }, []);

  const userCart = cart.filter((item) => item.user_id === 4);
  const totalArticles = userCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <h1>Les produits de mon panier ({totalArticles} articles)</h1>
      <ul>
        {userCart.map((item) => (
          <div key={item.user_id}>
            <img src={item.image_path} alt="" />
            <p> Produits:{item.product_name}</p>
            <p> Quantité:{item.quantity}</p>
            <p> Prix:{item.price}€</p>
          </div>
        ))}
      </ul>
      <button type="button" className="">
        Passer commande
      </button>
    </>
  );
}
export default Cart;
