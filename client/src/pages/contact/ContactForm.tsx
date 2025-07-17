import "./ContactForm.css";
import { Envelope, Instagram, TelephoneFill } from "react-bootstrap-icons";

function ContactForm() {
  return (
    <section className="contact m-auto">
      <article className="contact-form my-4 container">
        <h1 className="pb-3">Nous contacter</h1>
        <p>
          <TelephoneFill />
          <strong className="px-2">07 89 98 96 25</strong>
        </p>
        <p>
          <Envelope />
          <strong className="px-2">innovprint3d@outlook.fr</strong>
        </p>
        <p>
          <Instagram />
          <strong className="px-2">innovprint3-d</strong>
        </p>
      </article>
      <form className="contact-form container">
        <h1 className="pb-3">Demande personnalisée</h1>
        <div className="row">
          <div className="form-group col-12 col-md-6">
            <label className="contact-form-label fw-bold" htmlFor="lastname">
              Prénom :
            </label>
            <input
              type="text"
              className="contact-form-input form-control"
              name="firstname"
              autoComplete="given-name"
              placeholder="Marc"
              required
            />
          </div>
          <div className="form-group col-12 col-md-6">
            <label className="contact-form-label fw-bold" htmlFor="lastname">
              Nom :
            </label>
            <input
              type="text"
              className="contact-form-input form-control"
              name="lastname"
              autoComplete="family-name"
              placeholder="Dupont"
              required
            />
          </div>
          <div className="form-group col-12 col-md-6">
            <label className="contact-form-label fw-bold" htmlFor="email">
              Email :
            </label>
            <input
              type="email"
              className="contact-form-input form-control"
              name="email"
              autoComplete="email"
              placeholder="dupont@mail.com"
              required
            />
          </div>
          <div className="form-group col-12 col-md-6">
            <label className="contact-form-label fw-bold" htmlFor="phone">
              Téléphone :
            </label>
            <input
              type="tel"
              className="contact-form-input form-control"
              name="phone"
              autoComplete="tel"
              placeholder="0699999999"
              required
            />
          </div>
        </div>
        <div className="form-group col-12">
          <label className="contact-form-label fw-bold" htmlFor="phone">
            Message :
          </label>
          <textarea
            name="message"
            className="contact-form-input form-control"
            placeholder="Votre message ici"
            required
          />
        </div>
        <button
          className="contact-form-cta d-block py-2 fs-6 fw-bold w-50 rounded-4"
          type="submit"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
