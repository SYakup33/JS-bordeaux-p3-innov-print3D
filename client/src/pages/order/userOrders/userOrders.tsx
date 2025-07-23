import { useEffect, useState } from "react";
import "./userOrders.css";
import { Box, Receipt } from "react-bootstrap-icons";
import { useAuth } from "../../../context/AuthContext";
import type { UserOrder } from "../../../types/order";

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
      console.log(orders);
    };
    fetchUserOrders();
  }, [token, userId]);

  const orderRecap = userOrders.map((userOrder) => ({
    userOrder,
    totalArticles: userOrder.products.reduce((acc, p) => acc + p.quantity, 0),
    totalPrice: userOrder.products.reduce(
      (acc, p) => acc + p.quantity * p.unitPrice,
      0,
    ),
  }));

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
            {orderRecap.map(({ userOrder, totalArticles, totalPrice }) => (
              <article
                key={userOrder.orderId}
                className="rounded-3 p-3 shadow-sm border border-secondary"
              >
                <div className="border rounded bg-gradient p-4 mb-4 shadow-lg">
                  <div className="row gy-4">
                    <div className="col-12 col-md-5 d-flex flex-column">
                      <h4 className="text-dark mb-3 d-flex align-items-center">
                        <span>Commande #{userOrder.orderId}</span>
                      </h4>
                      <div className="d-flex flex-wrap gap-3 small">
                        <span className="border rounded-pill bg-light text-dark d-flex align-items-center gap-1 px-4 py-2 shadow-sm fw-bold">
                          <Box />
                          {totalArticles}{" "}
                          {totalArticles === 1 ? "article" : "articles"}
                        </span>

                        <span className="border rounded-pill bg-info text-dark fw-bold d-flex align-items-center gap-1 px-4 py-2 shadow-sm">
                          {totalPrice.toFixed(2)} €
                        </span>

                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-semibold text-dark">
                            Statut : {userOrder.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-md-row text-md-center w-100 text-muted mb-3 small">
                    <div className="col-md-4 mb-2 ">
                      <strong>Date :</strong>
                      {new Date(userOrder.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="border-top mt-2">
                    <div className="order-products-scroll">
                      <ul className="row list-unstyled g-3 mt-1">
                        {userOrder.products.map((p) => (
                          <li
                            key={p.productId}
                            className="col-6 col-md-4 col-lg-3 text-center"
                          >
                            <div className="bg-white p-3 rounded shadow-sm h-100">
                              <img
                                src={p.image}
                                alt={p.productName}
                                className="img-fluid rounded mb-2 admin-order-product-img"
                              />
                              <div className="fw-medium small">
                                <span className="text-dark">{p.quantity}</span>{" "}
                                x{" "}
                                <span className="text-dark">
                                  {p.productName}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
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
