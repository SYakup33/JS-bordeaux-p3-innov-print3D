import { StatusCodes } from "http-status-codes";
import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { FieldError, FieldErrors } from "../../../types/field-errors";
import "./register.css";

function Register() {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const zip_codeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<FieldErrors>({});

  const navigate = useNavigate();

  const createAccount: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: (firstnameRef.current as HTMLInputElement).value,
            lastname: (lastnameRef.current as HTMLInputElement).value,
            street: (streetRef.current as HTMLInputElement).value,
            zip_code: (zip_codeRef.current as HTMLInputElement).value,
            city: (cityRef.current as HTMLInputElement).value,
            country: (countryRef.current as HTMLInputElement).value,
            email: (emailRef.current as HTMLInputElement).value,
            phone: (phoneRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
            confirmPassword: (confirmPasswordRef.current as HTMLInputElement)
              .value,
          }),
        },
      );

      if (response.status === StatusCodes.CREATED) {
        toast.success("Votre compte a été créé avec succès !");
        navigate("/login");
      } else if (response.status === StatusCodes.BAD_REQUEST) {
        const data = await response.json();

        if (data.details) {
          const fieldErrors: FieldErrors = {};

          for (const err of data.details as FieldError[]) {
            fieldErrors[err.field] = err.message;
          }

          setErrors(fieldErrors);
          toast.error("Veuillez corriger le(s) erreur(s) du formulaire.");
        } else {
          toast.error(data.error || "Erreur de validation.");
        }
      } else if (response.status === StatusCodes.CONFLICT) {
        const data = await response.json();
        setErrors({ email: data.error });
        toast.error(data.error);
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur de connexion au serveur.");
    }
  };

  return (
    <section className="register m-auto">
      <form className="register-form p-4" onSubmit={createAccount}>
        <div className="form-group">
          <label className="register-label" htmlFor="firstname">
            Prénom :
          </label>
          <input
            className="register-input form-control"
            placeholder="Votre prénom"
            ref={firstnameRef}
            type="text"
            id="firstname"
            onChange={() => setErrors((prev) => ({ ...prev, firstname: "" }))}
          />
          {errors.firstname && (
            <p className="text-danger">{errors.firstname}</p>
          )}
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="lastname">
            Nom :
          </label>
          <input
            className="register-input form-control"
            placeholder="Votre nom"
            ref={lastnameRef}
            type="text"
            id="lastname"
            onChange={() => setErrors((prev) => ({ ...prev, lastname: "" }))}
          />
          {errors.lastname && <p className="text-danger">{errors.lastname}</p>}
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="street">
            Voie :
          </label>
          <input
            className="register-input form-control"
            placeholder="Ex. : 33 rue Jean Jaurès"
            ref={streetRef}
            type="text"
            id="street"
            onChange={() => setErrors((prev) => ({ ...prev, street: "" }))}
          />
          {errors.street && <p className="text-danger">{errors.street}</p>}
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="zip_code">
            Code postal :
          </label>
          <input
            className="register-input form-control"
            placeholder="Votre code postal"
            ref={zip_codeRef}
            type="text"
            id="zip_code"
            onChange={() => setErrors((prev) => ({ ...prev, zip_code: "" }))}
          />
          {errors.zip_code && <p className="text-danger">{errors.zip_code}</p>}
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="city">
            Commune :
          </label>
          <input
            className="register-input form-control"
            placeholder="Votre commune"
            ref={cityRef}
            type="text"
            id="city"
            onChange={() => setErrors((prev) => ({ ...prev, city: "" }))}
          />
          {errors.city && <p className="text-danger">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="country">
            Pays :
          </label>
          <input
            className="register-input form-control"
            placeholder="Votre pays"
            ref={countryRef}
            type="text"
            id="country"
            onChange={() => setErrors((prev) => ({ ...prev, country: "" }))}
          />
          {errors.country && <p className="text-danger">{errors.country}</p>}
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="email">
            Email :
          </label>
          <input
            className="register-input form-control"
            placeholder="dupont@mail.com"
            ref={emailRef}
            type="email"
            id="email"
            onChange={() => setErrors((prev) => ({ ...prev, email: "" }))}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="phone">
            Téléphone :
          </label>
          <input
            className="register-input form-control"
            placeholder="0655778899"
            ref={phoneRef}
            type="tel"
            id="phone"
            onChange={() => setErrors((prev) => ({ ...prev, phone: "" }))}
          />
          {errors.phone && <p className="text-danger">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="password">
            Créer votre mot de passe :
          </label>
          <input
            className="register-input form-control"
            placeholder="Choisissez votre mot de passe"
            ref={passwordRef}
            type="password"
            id="password"
            onChange={() => setErrors((prev) => ({ ...prev, password: "" }))}
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="confirmPassword">
            Confirmation du mot de passe :
          </label>
          <input
            className="register-input form-control"
            placeholder="Confirmez votre mot de passe"
            ref={confirmPasswordRef}
            type="password"
            id="confirmPassword"
            onChange={() =>
              setErrors((prev) => ({ ...prev, confirmPassword: "" }))
            }
          />
          {errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword}</p>
          )}
        </div>
        <button
          className="register-cta my-5 py-4 fs-4 fw-bold w-75 rounded-4"
          type="submit"
        >
          Créer mon compte
        </button>
      </form>
    </section>
  );
}

export default Register;
