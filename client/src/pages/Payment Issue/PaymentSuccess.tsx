import { BagCheck, Receipt } from "react-bootstrap-icons";
import logo from "/img/icons/lnnovPrintLogo.png";
import "./Payment.css";

function PaymentSuccess() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-start p-3 p-md-5 cart-header-title mb-4">
        <h2 className="d-flex align-items-center gap-2 mb-1">
          <Receipt size={28} />
          Commande
        </h2>
      </div>
      <section className="d-flex align-items-center justify-content-center">
        <article className="container d-flex flex-column border border-secondary rounded p-5 align-items-center text-center">
          <p className="p-md-5 mb-md-5 w-100 shadow-lg border-none rounded fw-semibold confirmed-payment-message ">
            Votre paiement est bien validé
            <BagCheck size={90} color="green" className="ms-2 img-fluid" />
          </p>
          <div className="mb-3">
            <img src={logo} alt="logo InnovPrint3D" className="img-fluid" />
          </div>
          <div className="w-100 confirmed-order-consult">
            <button
              type="button"
              className=" btn w-100 btn-lg fw-semibold confirmed-order-btn-animated"
            >
              Consulter mes commandes
            </button>
          </div>
        </article>
      </section>
    </>
  );
}
export default PaymentSuccess;
