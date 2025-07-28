import { Star, StarFill, StarHalf } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import CustomDesign from "../../../img/icons/CustomDesign.jpg";
import FastTruck from "../../../img/icons/FastTruck.jpg";
import GoogleLogo from "../../../img/icons/GoogleLogo.png";
import ResponsiblePurchase from "../../../img/icons/ResponsiblePurchase.jpg";
import pokeball_arcanin_1 from "../../../img/pokeball_arcanin_1.jpg";
import CategoryProducts from "../../components/product/catProducts/CategoryProducts";
import TrendProducts from "../../components/product/trendProducts/TrendProducts";
import "./Home.css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const reviews = [
  {
    id: 1,
    name: "Eric Dupont",
    date: "18/02/2025",
    rating: 5,
    comment:
      "Génial ! Merci, produits top, vendeur top, efficace et prix correct !",
  },
  {
    id: 2,
    name: "Camille Duret",
    date: "07/03/2025",
    rating: 3,
    comment:
      "La qualité est correct. En attente de nouveaux produits. Pour le reste parfait.",
  },
  {
    id: 3,
    name: "Sylvie Durand",
    date: "11/05/2025",
    rating: 4.5,
    comment:
      "Produit correspondant à la photo. Rapide et efficace, je recommande vivement.",
  },
  {
    id: 4,
    name: "Lucas Lefèvre",
    date: "20/06/2025",
    rating: 4,
    comment:
      "Très satisfait de ma commande ! Figurine bien emballée et conforme aux attentes.",
  },
  {
    id: 5,
    name: "Thomas Garnier",
    date: "15/07/2025",
    rating: 4.5,
    comment:
      "Super expérience ! Envoi rapide, bonne qualité, et le design est top.",
  },
];

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
      <section className="home-browse-creation text-black d-sm-flex">
        <div className="home-browse-creation-content d-flex flex-column flex-md-row justify-content-evenly p-3 p-md-2 w-100">
          <div className="d-flex flex-column align-items-start justify-content-center gap-4 my-4">
            <h2 className="pb-3 fw-semibold ms-5">Création & Impression 3D</h2>
            <p className="home-browse-creation-p fs-md-7 ms-5 w-75 lh-3">
              Explore un univers de figurines imprimées en 3D, pensées et créées
              avec passion. Chaque modèle est conçu avec soin pour capturer
              l’imaginaire et l’originalité. Que tu sois collectionneur ou
              curieux, laisse-toi surprendre par des créations uniques.
            </p>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="btn home-browse-creation-btn ms-5"
            >
              Parcourir les créations
            </button>
          </div>
          <div className="home-browse-creation-img-div d-flex justify-content-center align-items-center mt-md-0 mt-3 w-100">
            <img
              src={pokeball_arcanin_1}
              alt="Illustration"
              className="home-browse-creation-img rounded-4 w-75 object-fit-cover my-5"
            />
          </div>
        </div>
      </section>

      <CategoryProducts />
      <TrendProducts />

      <section className="home-choose-us d-flex flex-column mb-5 justify-content-center align-items-center home-margin-top">
        <div>
          <h2 className="text-center fw-semibold text-light mt-3 py-4 px-2">
            Pourquoi nous choisir
          </h2>
        </div>
        <div className="row w-100 mb-5">
          <div className="col-md-4 mt-3">
            <div className="card">
              <img
                src={FastTruck}
                className="card-img-top w-25 mx-auto pt-1"
                alt="Icône livraison rapide"
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
                alt="Icône création sur mesure"
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
                className="card-img-top w-25 mx-auto pt-1 "
                alt="Icône achat responsable"
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

      <div className="home-margin-top reviews-top">
        <h2 className="text-center fw-semibold  mb-5 mt-5">
          Les avis de nos clients
        </h2>
        <section className="d-md-none">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 7000 }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="mb-3">
                <div className="card mx-3 mb-4 w-50 text-center mx-auto mt-3">
                  <div className="p-2">
                    <div className="d-flex align-items-center w-100 justify-content-end">
                      <h3 className="fw-bold fs-6 mt-3 w-75">{review.name}</h3>
                      <img
                        src={GoogleLogo}
                        className="review-google-img pt-1 ms-1"
                        alt="Google"
                      />
                    </div>
                    <p className="mb-1 fw-lighter">{review.date}</p>
                    <div>{renderStars(review.rating)}</div>
                    <p className="card-text fs-6">{review.comment}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>

      <section className="d-none d-md-flex justify-content-center ">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          <div className="container row w-75 text-center mb-3">
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="mb-3">
                <div key={review.id} className="mt-3 mt-md-2 w-75 mb-3 mx-auto">
                  <div className="card home-review-card text-center">
                    <div className="">
                      <div className="d-flex align-items-center w-75 justify-content-end ms-4">
                        <h3 className="fw-bold fs-6 pt-3 w-75">
                          {review.name}
                        </h3>
                        <img
                          src={GoogleLogo}
                          className="review-google-img pt-1 ms-1"
                          alt="Google"
                        />
                      </div>
                      <p className="mb-1 fw-lighter">{review.date}</p>
                      <div className="">{renderStars(review.rating)}</div>
                      <p className="card-text home-review-comment mt-2">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </section>

      <section className="home-create-account text-center text-black p-4 mt-5 mx-auto home-margin-top mb-5 d-flex gap-4 align-items-center flex-column">
        <h2 className="mt-5">Rejoins la communauté des passionnés de 3D !</h2>
        <p>Crée ton compte et explore un univers unique de figurines 3D</p>
        <button
          type="button"
          onClick={() => {
            navigate("/register");
            window.scrollTo(0, 0);
          }}
          className="btn home-browse-creation-btn mb-5"
        >
          Créer un compte
        </button>
      </section>
    </>
  );
}

export default Home;
