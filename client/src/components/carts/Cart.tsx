import { CartFill, CartX, Dash, Plus, Trash } from "react-bootstrap-icons";
import "../../assets/styles/_variables.css";

function Cart({
  products,
  selectedProducts,
  checkProduct,
  updateQuantity,
  deleteProduct,
  checkAll,
  uncheckAll,
}: CartProps) {
  let totalSelectedPrice = 0;
  for (const product of products) {
    if (selectedProducts.includes(product.productId)) {
      totalSelectedPrice += product.price * product.quantity;
    }
  }

  return (
    <section className="d-flex flex-column">
      <div
        className="d-flex align-items-center justify-content-start p-5"
        style={{ backgroundColor: "var(--tertiary-color)", height: "100px" }}
      >
        <h2 className="d-flex align-items-center gap-2 mb-1">
          <CartFill size={28} />
          Mon Panier
          <span className="text-muted fs-6">
            ({products.length} article{products.length > 1 ? "s" : ""})
          </span>
        </h2>
      </div>
      <div className="container py-4 flex-grow-1">
        {products.length > 0 && (
          <div className="d-flex flex-column flex-md-row justify-content-start justify-content-md-between mb-3">
            <span className="text-muted">
              {selectedProducts.length === 0
                ? "Aucun article sélectionné."
                : selectedProducts.length === products.length
                  ? "Tous les articles sont sélectionnés."
                  : `${selectedProducts.length} article${selectedProducts.length > 1 ? "s" : ""} sélectionné${selectedProducts.length > 1 ? "s" : ""}.`}
            </span>
            {selectedProducts.length === products.length ? (
              <button
                type="button"
                className="btn btn-link p-0 text-danger d-flex justify-content-start"
                onClick={uncheckAll}
              >
                Désélectionner tous les articles
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-link p-0 d-flex justify-content-start"
                style={{ color: "#011847" }}
                onClick={checkAll}
              >
                Sélectionner tous les articles
              </button>
            )}
          </div>
        )}
        {products.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center text-muted">
            <CartX size={90} className="mb-3" />
            <h4>Votre panier est vide</h4>
          </div>
        ) : (
          <div className="list-group border-5 rounded w-100">
            {products.map((product) => (
              <div
                key={product.productId}
                className="flex-column list-group-item flex-md-row d-flex align-items-center gap-3 gap-md-0 p-3 "
              >
                <div
                  className="w-75 d-flex justify-content-center align-items-center gap-4"
                  style={{ height: "140px" }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input row align-items-center justifu-content-center text-center"
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
                    <small className="me-2 mb-0 fw-semibold">Quantité :</small>
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm p-1"
                      onClick={() =>
                        updateQuantity(product.productId, product.quantity - 1)
                      }
                      disabled={product.quantity === 1}
                      style={{ width: 28, height: 28 }}
                    >
                      <Dash />
                    </button>
                    <span className="fs-5">{product.quantity}</span>
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm p-1"
                      onClick={() =>
                        updateQuantity(product.productId, product.quantity + 1)
                      }
                      style={{ width: 28, height: 28 }}
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-between justify-content-md-end w-100">
                  <div className="text-end">
                    <div className="fw-bold fs-5">
                      <h5 className="mb-1">
                        <span className="small fw-bold">{product.price}€</span>
                        <span className="text-muted small ms-1">/ unité</span>
                      </h5>
                    </div>
                    <div className="text-muted small text-start text-md-center">
                      Total: {(product.price * product.quantity).toFixed(2)} €
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
      </div>
      {products.length > 0 && (
        <div className="z-10 border-top bg-white py-3 px-4 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center sticky-bottom shadow-sm">
          <h5 className="mb-0 text-dark fw-bold">
            Total sélectionné : {totalSelectedPrice.toFixed(2)} €
          </h5>

          <button
            type="button"
            className="btn btn-danger px-4 py-2 fw-semibold"
            disabled={totalSelectedPrice === 0}
          >
            Passer la commande
          </button>
        </div>
      )}
    </section>
  );
}

export default Cart;
