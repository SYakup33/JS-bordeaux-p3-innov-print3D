import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./ContactForm.css";
import { Envelope, Instagram, TelephoneFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import type { ContactError, ContactErrors } from "../../types/contact-errors";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactErrors>({});

  const onlyLetters = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ContactErrors,
  ) => {
    const value = e.target.value;
    const isValid = /^[\p{L}]+$/u.test(value) || value === "";

    if (isValid) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: "Ce champ doit contenir uniquement des lettres.",
      }));
    }
  };

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

      if (response.status === StatusCodes.OK) {
        toast.success("Votre message a été envoyé avec succès !");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
        });
      } else if (response.status === StatusCodes.BAD_REQUEST) {
        const { details, error } = await response.json();

        if (details) {
          const fieldErrors: ContactErrors = {};

          for (const err of details as ContactError[]) {
            fieldErrors[err.field] = err.message;
          }

          setErrors(fieldErrors);
          toast.error("Veuillez corriger le(s) erreur(s) du formulaire.");
        } else {
          toast.error(error || "Erreur de validation.");
        }
      } else if (response.status === StatusCodes.CONFLICT) {
        const { error } = await response.json();
        setErrors({ email: error });
        toast.error(error);
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur de connexion au serveur.");
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
              value={formData.firstname}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, firstname: "" }));
                onlyLetters(e, "firstname");
                inputChange(e);
              }}
            />
            {errors.firstname && (
              <p className="text-danger">{errors.firstname}</p>
            )}
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
              value={formData.lastname}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, lastname: "" }));
                onlyLetters(e, "lastname");
                inputChange(e);
              }}
            />
            {errors.lastname && (
              <p className="text-danger">{errors.lastname}</p>
            )}
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
              value={formData.email}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, email: "" }));
                inputChange(e);
              }}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
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
              value={formData.phone}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, phone: "" }));
                inputChange(e);
              }}
            />
            {errors.phone && <p className="text-danger">{errors.phone}</p>}
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
            value={formData.message}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, message: "" }));
              inputChange(e);
            }}
          />
          {errors.message && <p className="text-danger">{errors.message}</p>}
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
