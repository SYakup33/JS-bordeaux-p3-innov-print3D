import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./ContactForm.css";
import { Envelope, Instagram, TelephoneFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const inputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.status === StatusCodes.NO_CONTENT) {
        toast.success("Votre message a été envoyé avec succès !");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
    }
  };

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
      <form className="contact-form container" onSubmit={sendForm}>
        <h1 className="pb-3">Demande personnalisée</h1>
        <div className="row">
          <div className="form-group col-12 col-md-6">
            <label className="contact-form-label fw-bold" htmlFor="firstname">
              Prénom :
            </label>
            <input
              type="text"
              className="contact-form-input form-control"
              name="firstname"
              id="firstname"
              autoComplete="given-name"
              placeholder="Marc"
              required
              value={formData.firstname}
              onChange={inputChange}
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
              id="lastname"
              autoComplete="family-name"
              placeholder="Dupont"
              required
              value={formData.lastname}
              onChange={inputChange}
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
              id="email"
              autoComplete="email"
              placeholder="dupont@mail.com"
              required
              value={formData.email}
              onChange={inputChange}
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
              id="phone"
              autoComplete="tel"
              placeholder="0699999999"
              required
              value={formData.phone}
              onChange={inputChange}
            />
          </div>
        </div>
        <div className="form-group col-12">
          <label className="contact-form-label fw-bold" htmlFor="message">
            Message :
          </label>
          <textarea
            name="message"
            id="message"
            className="contact-form-input form-control"
            placeholder="Votre message ici"
            required
            value={formData.message}
            onChange={inputChange}
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
