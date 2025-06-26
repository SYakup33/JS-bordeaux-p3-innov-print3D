import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface CartWithProductsProps {
  userId: number;
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
  const [error, setError] = useState<string | null>(null);
  const userId = 11;

  const navigate = useNavigate();
  const placeAnOrder = async () => {
    if (cart.length === 0) {
      setError("Votre panier est vide");
      return;
    }
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/order/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: cart.map((p) => {
              return {
                product_id: p.product_id,
                unit_price: p.price,
                quantity: p.quantity,
              };
            }),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const path = "/order/confirmation";
      navigate(path);
    } catch (error) {
      setError("Erreur lors de la création de commande");
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
        setCart(cartData.data);
      } catch (error) {
        setError("Erreur lors du chargement du panier");
      }
    };

    fetchCart();
  }, []);

  const totalArticles = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {error && <p className="alert alert-danger">{error}</p>}

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
          className="btn btn-danger w-100 btn-lg fw-semibold"
          onClick={placeAnOrder}
        >
          Passer commande
        </button>
      </div>
    </>
  );
}
export default Cart;
