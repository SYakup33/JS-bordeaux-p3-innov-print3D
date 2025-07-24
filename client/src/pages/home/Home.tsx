import { useNavigate } from "react-router";
import pokeball_arcanin_1 from "../../../img/pokeball_arcanin_1.jpg";
import CustomDesign from "../../../public/img/icons/CustomDesign.jpg";
import FastTruck from "../../../public/img/icons/FastTruck.jpg";
import ResponsiblePurchase from "../../../public/img/icons/ResponsiblePurchase.jpg";
import TrendProducts from "../../components/product/trendProducts/TrendProducts";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section className="home-browse-creation text-black d-md-flex">
        <div className="home-browse-creation-content d-flex flex-column justify-content-evenly p-3 p-md-2 rounded-4 ms-md-3 w-100">
          <h2 className="pb-3 fw-semibold">Création & Impression 3D</h2>
          <p className="home-browse-creation-p fs-md-7">
            Explore un univers de figurines imprimées en 3D, pensées et créées
            avec passion. Chaque modèle est conçu avec soin pour capturer
            l’imaginaire et l’originalité. Que tu sois collectionneur ou
            curieux, laisse-toi surprendre par des créations uniques.
          </p>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="btn home-browse-creation-btn"
          >
            Parcourir les créations
          </button>
        </div>
        <div className="home-browse-creation-img-div d-flex justify-content-center mt-md-0 mt-3 w-100">
          <img
            src={pokeball_arcanin_1}
            alt="Illustration"
            className="home-browse-creation-img rounded-4 w-75"
          />
        </div>
      </section>
      <TrendProducts />
      <h2 className="text-center fw-semibold">Pourquoi nous choisir</h2>
      <section className="home-choose-us d-flex justify-content-center">
        <div className="container row w-75">
          <div className="col-md-4 mt-3">
            <div className="card">
              <img
                src={FastTruck}
                className="test card-img-top w-25 mx-auto pt-1"
                alt="Camion rapide"
              />
              <div className="card-body">
                <h5 className="fw-bold">Livraison rapide</h5>
                <p className="card-text home-choose-us-p">
                  Recevez vos figurines en un temps record grâce à notre service
                  d’expédition express.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="card">
              <img
                src={CustomDesign}
                className="card-img-top w-25 mx-auto pt-1"
                alt="Création sur mesure"
              />
              <div className="card-body">
                <h5 className="fw-bold">Création sur mesure</h5>
                <p className="card-text home-choose-us-p">
                  Donnez vie à vos idées avec des figurines personnalisées à
                  votre image.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            <div className="card">
              <img
                src={ResponsiblePurchase}
                className="card-img-top w-25 mx-auto pt-1"
                alt="Achat responsable"
              />
              <div className="card-body">
                <h5 className="fw-bold">Achat responsable</h5>
                <p className="card-text home-choose-us-p">
                  Fabriqué à base de filament PLA composé de polymère et
                  d'amidon de maïs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
