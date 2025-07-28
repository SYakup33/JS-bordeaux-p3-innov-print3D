import { ShieldFillCheck } from "react-bootstrap-icons";

function LegalNotices() {
  return (
    <section className="m-auto">
      <h2 className="d-flex align-items-center gap-2 mb-1 about-header-title p-5">
        <ShieldFillCheck size={28} />
        Mentions légales
      </h2>
      <article className="container d-block justify-content-center mt-4">
        <div className=" mb-3">
          <p className="mb-4">
            Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance
            dans l'économie numérique, nous vous informons que :
          </p>
        </div>
        <div className="row mb-3">
          <h3>1. Éditeur du site </h3>
          <p className="mb-2 mt-2 mt-md-0">
            Le site internet <strong>InnovProint3D</strong> est un projet
            développé dans le cadre d’un apprentissage par quatre personnes :
            <br />
            <br />
            Thomas Chataigner
            <br />
            Cynthia Morelle
            <br />
            Yakup Senel
            <br />
            Imane Bichon
          </p>
        </div>
        <div className="row">
          <div className="col">
            <p>
              Ce site a été conçu pour le compte de InnovPrint3D afin de
              présenter et vendre ses produits.
              <br />
              Il ne fait pas encore l’objet d’une immatriculation commerciale,
              mais une activité professionnelle est envisagée prochainement.
            </p>
            <br />
          </div>
          <h3>2. Données personnelles</h3>
          <br />
          <p>
            Les données personnelles éventuellement collectées sur le site
            (formulaire de contact, commandes, etc.) sont destinées uniquement à
            InnovPrint3D pour un usage strictement administratif et commercial.
            Ces données ne sont ni cédées ni revendues à des tiers.
          </p>
          <p>
            Conformément à la loi n°78-17 du 6 janvier 1978 modifiée, et au
            Règlement Général sur la Protection des Données (RGPD), vous
            disposez d’un droit d’accès, de rectification et de suppression des
            données vous concernant. Pour l’exercer, vous pouvez envoyer une
            demande à : <span className="fw-bold">innovprint3d@outlook.fr</span>
            .
          </p>
        </div>
        <br />
        <h3>3. Contactez-nous</h3>
        <p>
          Pour toute question, information sur les produits présentés sur le
          site, ou concernant le site lui-même, vous pouvez laisser un message à
          l'adresse suivante :
          <span className="fw-bold">innovprint3d@outlook.fr</span>.
        </p>
      </article>
    </section>
  );
}

export default LegalNotices;
