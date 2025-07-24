import { InfoSquareFill } from "react-bootstrap-icons";
import "./About.css";
import portrait from "/img/others/portrait.jpg";
import printer from "/img/others/printer.png";

function About() {
  return (
    <section className="m-auto">
      <h2 className="d-flex align-items-center gap-2 mb-1 about-header-title p-5">
        <InfoSquareFill size={28} />À propos
      </h2>
      <article className="container d-block justify-content-center mt-4 about w-75">
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <p className="mb-4">
              Passionné par la création et les nouvelles technologies, j’ai
              découvert l’impression 3D en juillet 2024. Ce fut une véritable
              révélation : pouvoir donner vie à mes idées, créer des objets
              utiles, décoratifs ou personnalisés, m’a immédiatement captivé.
              Très vite, ce qui n’était qu’une passion est devenu une évidence :
              je voulais aller plus loin.
            </p>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-start">
            <img
              src={portrait}
              alt="Portrait"
              className="img-fluid rounded about-img"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-start text-center">
            <img
              src={printer}
              alt="Cliché de l'imprimante"
              className="img-fluid about-img"
            />
            <small className="text-muted mt-2 mb-2">
              Imprimante utilisée : Bambu Lab P1S
            </small>
          </div>
          <div className="col-12 col-md-6">
            <p className="mb-2 mt-2 mt-md-0">
              C’est ainsi qu’est née InnovPrint3D en février 2025, mon
              auto-entreprise dédiée à la conception et à l'impression 3D sur
              mesure. Mon objectif ? Proposer des objets uniques,
              personnalisables et de qualité, alliant créativité et utilité. Que
              ce soit pour offrir un cadeau original, organiser un événement ou
              simplement se faire plaisir, chaque création est pensée avec soin
              et imprimée avec précision.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>
              Aujourd’hui, je mets mon savoir-faire au service de vos envies.
              InnovPrint3D, c’est l’alliance de la passion, de l’innovation et
              du sur-mesure, au cœur de chaque projet.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default About;
