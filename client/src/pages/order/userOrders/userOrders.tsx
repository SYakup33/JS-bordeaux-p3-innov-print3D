import { useEffect, useState } from "react";
import "./userOrders.css";
import { Receipt } from "react-bootstrap-icons";
import { useAuth } from "../../../context/AuthContext";
import type { UserOrder } from "../../../types/order";

// function UserOrders() {
//   const { currentUser, token } = useAuth();
//   const [orders, setOrders] = useState<OrderType[]>([]);
//   const [message, setMessage] = useState<Message | null>(null);
//   const userId = currentUser?.id;
//   const fetchOrders = useCallback(async () => {
//     if (!userId || !token) return;
//     try {
//       const fetchOrdersResponse = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/orders/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       if (!fetchOrdersResponse.ok) {
//         throw new Error(`HTTP error! status: ${fetchOrdersResponse.status}`);
//       }
//       const ordersData = await fetchOrdersResponse.json();
//       setOrders(ordersData);
//     } catch (err) {
//       console.error("Erreur lors de la création de commande:", err);
//       setMessage({
//         text: "Erreur lors de la création de la commande. Veuillez réessayer.",
//       });
//     }
//   }, [userId, token]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   return (
//     <>
//       <h1>Voici mes commandes</h1>
//       {message && <div className="alert alert-danger">{message.text}</div>}

//       {orders.length > 0 ? (
//         orders.map((order: OrderType) => (
//           <div key={order.orderId} className="card mb-2">
//             <div className="card-body">
//               <h2>Commande </h2>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>Aucune commande</p>
//       )}
//     </>
//   );
// }
// export default UserOrders;

const UserOrders = () => {
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);
  const { token, currentUser } = useAuth();
  const userId = currentUser?.id;

  useEffect(() => {
    console.log(`userId = ${userId}`);
    if (!userId) {
      return;
    }
    const fetchUserOrders = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const orders = await response.json();
      setUserOrders(orders);
    };
    fetchUserOrders();
  }, [token, userId]);

  return (
    <section>
      <div className="d-flex align-items-center justify-content-start p-3 p-md-5 cart-header-title mb-5">
        <h2 className="d-flex align-items-center gap-2 mb-1">
          <Receipt size={28} />
          Mes commandes
        </h2>
      </div>
      <div className="container py-4 ">
        {userOrders.length === 0 ? (
          <p className="text-center fw-semibold">Aucune commande à afficher</p>
        ) : (
          <div className="d-flex flex-column gap-4">
            {userOrders.map(({ orderId }) => (
              <article
                key={orderId}
                className="rounded-3 p-3 shadow-sm border border-secondary"
              >
                <div className="border rounded bg-gradient p-4 mb-4 shadow-lg">
                  <div className="row gy-4">
                    <div className="col-12 col-md-5 d-flex flex-column">
                      <h4 className="text-dark mb-3 d-flex align-items-center">
                        <span>Commande #{orderId}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserOrders;
