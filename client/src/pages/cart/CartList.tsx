import { useEffect, useState } from "react";
import { CartFill, CartX, Dash, Plus, Trash } from "react-bootstrap-icons";
import { useParams } from "react-router";
import type { CartProduct } from "../../types/cart";
import "./CartList.css";
import { useNavigate } from "react-router";

type Message = { text: string };

function CartList() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [message, setMessage] = useState<Message | null>(null);
  const { id } = useParams();
  const userId = Number(id);
  const navigate = useNavigate();

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
        setMessage({
          text: "Erreur lors du chargement du panier",
        });
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
      setMessage({
        text: "Impossible de modifier la quantité",
      });
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      setMessage(null);
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
      setMessage({
        text: "Impossible de supprimer le produit",
      });
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

  let totalSelectedPrice = 0;
  for (const product of cartProducts) {
    if (selectedProducts.includes(product.productId)) {
      totalSelectedPrice += product.price * product.quantity;
    }
  }

  return (
    <section className="d-flex flex-column">
      <div className="d-flex align-items-center justify-content-start p-5 cart-header-title">
        <h2 className="d-flex align-items-center gap-2 mb-1">
          <CartFill size={28} />
          Mon Panier
          <span className="text-muted fs-6">
            ({cartProducts.length} article{cartProducts.length > 1 ? "s" : ""})
          </span>
        </h2>
      </div>
      <div className="container py-4 flex-grow-1">
        {message ? (
          <div
            className="alert alert-danger mt-4 text-center fw-semibold"
            role="alert"
          >
            {message.text}
          </div>
        ) : (
          <div>
            {cartProducts.length > 0 && (
              <div className="d-flex flex-column flex-md-row justify-content-start justify-content-md-between mb-3">
                <span className="text-muted">
                  {selectedProducts.length === 0
                    ? "Aucun article sélectionné."
                    : selectedProducts.length === cartProducts.length
                      ? "Tous les articles sont sélectionnés."
                      : `${selectedProducts.length} article${selectedProducts.length > 1 ? "s" : ""} sélectionné${selectedProducts.length > 1 ? "s" : ""}.`}
                </span>
                {selectedProducts.length === cartProducts.length ? (
                  <button
                    type="button"
                    className="btn btn-link p-0 text-danger d-flex justify-content-start"
                    onClick={() => setSelectedProducts([])}
                  >
                    Désélectionner tous les articles
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn p-0 d-flex justify-content-start text-dart text-decoration-underline"
                    onClick={() =>
                      setSelectedProducts(cartProducts.map((p) => p.productId))
                    }
                  >
                    Sélectionner tous les articles
                  </button>
                )}
              </div>
            )}
            {cartProducts.length === 0 ? (
              <div className="d-flex flex-column justify-content-center align-items-center text-muted">
                <CartX size={90} className="mb-3" />
                <h4>Votre panier est vide</h4>
              </div>
            ) : (
              <div className="list-group border-5 rounded w-100">
                {cartProducts.map((product) => (
                  <div
                    key={product.productId}
                    className="flex-column list-group-item flex-md-row d-flex align-items-center gap-3 gap-md-0 p-3 "
                  >
                    <div className="w-75 d-flex justify-content-center align-items-center gap-4 cart-container">
                      <input
                        type="checkbox"
                        className="form-check-input row align-items-center justify-content-center text-center"
                        onChange={() => checkProduct(product.productId)}
                        checked={selectedProducts.includes(product.productId)}
                      />
                      <img
                        src={product.images?.[0]}
                        alt={product.productName}
                        className="object-fit-cover rounded-2 w-75 h-100"
                      />
                    </div>
                    <div className="flex-grow-1 w-100">
                      <h5 className="mb-1">{product.productName}</h5>
                      <div className="mb-1">
                        <small className="badge bg-secondary">
                          {product.categoryName}
                        </small>
                      </div>
                      <p className="text-muted small mb-2 w-100">
                        {product.description}
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        <small className="me-2 mb-0 fw-semibold">
                          Quantité :
                        </small>
                        <button
                          type="button"
                          className="btn btn-outline-dark btn-sm p-1"
                          onClick={() =>
                            updateQuantity(
                              product.productId,
                              product.quantity - 1,
                            )
                          }
                          disabled={product.quantity === 1}
                        >
                          <Dash size={20} />
                        </button>
                        <span className="fs-5">{product.quantity}</span>
                        <button
                          type="button"
                          className="btn btn-outline-dark btn-sm p-1"
                          onClick={() =>
                            updateQuantity(
                              product.productId,
                              product.quantity + 1,
                            )
                          }
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between justify-content-md-end w-100">
                      <div className="text-end">
                        <div className="fw-bold fs-5">
                          <h5 className="mb-1">
                            <span className="small fw-bold">
                              {product.price}€
                            </span>
                            <span className="text-muted small ms-1">
                              / unité
                            </span>
                          </h5>
                        </div>
                        <div className="text-muted small text-start text-md-center">
                          Total: {(product.price * product.quantity).toFixed(2)}{" "}
                          €
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-link text-danger p-0 ms-3"
                        onClick={() => deleteProduct(product.productId)}
                      >
                        <Trash size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartProducts.length > 0 && (
              <div className="z-10 border-top bg-white py-3 px-4 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center sticky-bottom shadow-sm">
                <h5 className="mb-0 text-dark fw-bold">
                  Total sélectionné : {totalSelectedPrice.toFixed(2)} €
                </h5>
                <button
                  type="button"
                  className="btn btn-danger px-4 py-2 fw-semibold"
                  disabled={totalSelectedPrice === 0}
                  onClick={() => {
                    const productToOrder = cartProducts.filter((p) =>
                      selectedProducts.includes(p.productId),
                    );
                    navigate(`/order/confirmation/${userId}`, {
                      state: { selectedProducts: productToOrder },
                    });
                  }}
                >
                  Passer la commande
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default CartList;
