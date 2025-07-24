import { Star, StarFill, StarHalf } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import pokeball_arcanin_1 from "../../../img/pokeball_arcanin_1.jpg";
import CustomDesign from "../../../public/img/icons/CustomDesign.jpg";
import FastTruck from "../../../public/img/icons/FastTruck.jpg";
import GoogleLogo from "../../../public/img/icons/GoogleLogo.png";
import ResponsiblePurchase from "../../../public/img/icons/ResponsiblePurchase.jpg";
import TrendProducts from "../../components/product/trendProducts/TrendProducts";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const renderStars = (note: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const key = `star-${note}-${i}`;
      if (i <= Math.floor(note)) {
        stars.push(<StarFill key={key} className="home-stars" size={15} />);
      } else if (i - 0.5 === note) {
        stars.push(<StarHalf key={key} className="home-stars" size={15} />);
      } else {
        stars.push(<Star key={key} className="home-stars" size={15} />);
      }
    }
    return stars;
  };
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
                className="card-img-top w-25 mx-auto pt-1"
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
      <h2 className="text-center fw-semibold mt-5">Les avis de nos clients</h2>
      <section className="home-choose-us d-flex justify-content-center">
        <div className="container row w-75 text-center">
          <div className="col-md-4 mt-3 mt-md-2">
            <div className="card">
              <div className="p-2">
                <div className="d-flex align-items-center w-75 justify-content-end ms-4">
                  <h3 className="fw-bold fs-6 mt-3 w-75">Eric Dupont</h3>
                  <img
                    src={GoogleLogo}
                    className="review-google-img pt-1 ms-1"
                    alt="Google"
                  />
                </div>
                <p className="mb-1 fw-lighter">18/02/2025</p>
                <div className="">{renderStars(5)}</div>
                <p className="card-text fs-6">
                  Génial ! Merci, produits top, vendeur top, efficace et prix
                  correct !
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3 mt-md-2">
            <div className="card">
              <div className="p-2">
                <div className="d-flex align-items-center w-75 justify-content-end ms-4">
                  <h3 className="fw-bold fs-6 mt-3 w-75">Camille Duret</h3>
                  <img
                    src={GoogleLogo}
                    className="review-google-img pt-1 ms-1"
                    alt="Google"
                  />
                </div>
                <p className="mb-1 fw-lighter">07/03/2025</p>
                <div className="">{renderStars(3)}</div>
                <p className="card-text fs-6">
                  La qualité est correct. En attente de nouveaux produits. Pour
                  le reste parfait.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3 mt-md-2">
            <div className="card">
              <div className="p-2">
                <div className="d-flex align-items-center w-75 justify-content-end ms-4">
                  <h3 className="fw-bold fs-6 mt-3 w-75">Sylvie Durand</h3>
                  <img
                    src={GoogleLogo}
                    className="review-google-img pt-1 ms-1"
                    alt="Google"
                  />
                </div>
                <p className="mb-1 fw-lighter">11/05/2025</p>
                <div className="">{renderStars(4.5)}</div>
                <p className="card-text fs-6">
                  Produit correspondant à la photo. Rapide et efficace, je
                  recommande vivement
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
