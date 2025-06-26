import logo from "../assets/images/lnnovPrintLogo.png";
import "./ConfirmatedOrder.css";

function ConfirmatedOrder() {
  return (
    <>
      <body className="d-flex align-items-center justify-content-center">
        <section className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="d-flex flex-column align-items-center text-center">
                <p className="p-4 p-md-5 mb-4 mb-md-5 w-100 confirmated-order-message">
                  Votre commande est bien validée, nous vous recontacterons
                  ultérieurement pour procéder au règlement
                </p>

                <img src={logo} alt="logo InnovPrint3D" />

                <div className="w-100 consult">
                  <button
                    type="button"
                    className=" btn btn-danger w-100 btn-lg fw-semibold btn-animated"
                  >
                    Consulter mes commandes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </>
  );
}
export default ConfirmatedOrder;
