import logo from "../assets/images/lnnovPrintLogo.png";

function ConfirmatedOrder() {
  return (
    <>
      <body
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: "#FFF",
          fontFamily: "var(--font-family)",
        }}
      >
        <section className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div
                className="d-flex flex-column align-items-center text-center"
                style={{
                  animation: "fadeInUp 0.8s ease-out",
                }}
              >
                {/* Message de confirmation */}
                <p
                  className="p-4 p-md-5 mb-4 mb-md-5 w-100"
                  style={{
                    background: "var(--linear-gradient)",
                    color: "var(--font-secondary-color)",
                    borderRadius: "20px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                    border: "none",
                    margin: "0",
                    lineHeight: "1.3",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  Votre commande est bien validée, nous vous recontacterons
                  ultérieurement pour procéder au règlement
                </p>

                <img src={logo} alt="logo InnovPrint3D" />

                {/* Bouton CTA */}
                <div className="w-100" style={{ maxWidth: "300px" }}>
                  <button
                    type="button"
                    className="btn w-100 py-3 px-4"
                    style={{
                      backgroundColor: "var(--btn-cta-primary-color)",
                      color: "var(--font-cta-btn-primary)",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "1rem;",
                      fontWeight: "600",
                      fontFamily: "var(--font-family)",
                      transition: "all 0.3s ease",
                      boxShadow: "0 8px 25px rgba(223, 48, 48, 0.3)",
                      letterSpacing: "0.5px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#c82828";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 35px rgba(223, 48, 48, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--btn-cta-primary-color)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(223, 48, 48, 0.3)";
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(223, 48, 48, 0.3)";
                    }}
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
