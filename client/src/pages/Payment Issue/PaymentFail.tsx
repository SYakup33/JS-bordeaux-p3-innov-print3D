import { BagX } from "react-bootstrap-icons";
import logo from "/img/icons/lnnovPrintLogo.png";

function PaymentFail() {
  return (
    <>
      <section className="d-flex align-items-center justify-content-center">
        <article className="container d-flex flex-column border border-secondary rounded p-5 align-items-center text-center">
          <p className="p-md-5 mb-md-5 w-100 shadow-lg border-none rounded fw-semibold confirmed-payment-message ">
            Votre paiement n'a pas abouti
            <BagX size={90} color="red" className="ms-4 img-fluid" />
          </p>
          <div className="mb-3">
            <img src={logo} alt="logo InnovPrint3D" className="img-fluid" />
          </div>
          <div className="w-100 confirmed-order-consult">
            <button
              type="button"
              className=" btn w-100 btn-lg fw-semibold confirmed-order-btn-animated"
            >
              Retourner à mon panier
            </button>
          </div>
        </article>
      </section>
    </>
  );
}

export default PaymentFail;
