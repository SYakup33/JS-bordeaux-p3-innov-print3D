import { BagCheck } from "react-bootstrap-icons";
import logo from "/img/icons/lnnovPrintLogo.png";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  return (
    <>
      <section className="d-flex align-items-center justify-content-center">
        <article className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="d-flex flex-column align-items-center text-center">
                <p className="p-4 p-md-5 mb-4 mb-md-5 w-100 confirmed-order-message">
                  Votre paiement est bien validé
                  <BagCheck size={90} color="green" />
                </p>
                <div className="">
                  <img src={logo} alt="logo InnovPrint3D" />
                </div>
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
export default PaymentSuccess;
