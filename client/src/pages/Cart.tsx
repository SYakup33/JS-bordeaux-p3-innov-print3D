import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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

// interface Order {
//   user_id: number;
//   status: "en préparation" | "expédiée" | "livrée" | "annulée";
// }

function Cart() {
  const [cart, setCart] = useState<CartWithProductsProps[]>([]);

  const userId = 4;

  const navigate = useNavigate();
  const routeChange = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, status: "en préparation" }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const path = "/order/confirmation";
      navigate(path);
    } catch (error) {
      console.error("❌ Erreur lors du fetch:", error);
    }
  };

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

  const totalArticles = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <h1>Les produits de mon panier ({totalArticles} articles)</h1>
      <ul>
        {cart.map((item) => (
          <div key={item.product_id}>
            <img src={item.image_path} alt="" />
            <p> Produits:{item.product_name}</p>
            <p> Quantité:{item.quantity}</p>
            <p> Prix:{item.price}€</p>
          </div>
        ))}
      </ul>
      <div className="container">
        <button
          type="button"
          className="btn btn-danger w-100 btn-lg  fw-semibold"
          onClick={routeChange}
          style={{
            backgroundColor: "#dc3545",
            borderColor: "#dc3545",
            borderRadius: "8px",
          }}
        >
          Passer commande
        </button>
      </div>
    </>
  );
}
export default Cart;
