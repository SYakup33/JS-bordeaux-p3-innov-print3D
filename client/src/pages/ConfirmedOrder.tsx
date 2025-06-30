import { useLocation, useParams } from "react-router";
import logo from "../../public/img/icons/lnnovPrintLogo.png";
import "./ConfirmedOrder.css";
import { useEffect } from "react";
import type { SelectedProductsType } from "../types/order";

function ConfirmedOrder() {
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts;
  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    const placeAnOrder = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/order/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              products: selectedProducts.map((p: SelectedProductsType) => {
                return {
                  product_id: p.productId,
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
      } catch (error) {
        console.error("Erreur lors de la création de commande");
      }
    };
    placeAnOrder();
  }, [userId, selectedProducts]);

  return (
    <>
      <section className="d-flex align-items-center justify-content-center">
        <article className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="d-flex flex-column align-items-center text-center">
                <p className="p-4 p-md-5 mb-4 mb-md-5 w-100 confirmed-order-message">
                  Votre commande est bien validée, nous vous recontacterons
                  ultérieurement pour procéder au règlement
                </p>
                <img src={logo} alt="logo InnovPrint3D" />

                <div className="w-100 confirmed-order-consult">
                  <button
                    type="button"
                    className=" btn w-100 btn-lg fw-semibold confirmed-order-btn-animated"
                  >
                    Consulter mes commandes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
export default ConfirmedOrder;
