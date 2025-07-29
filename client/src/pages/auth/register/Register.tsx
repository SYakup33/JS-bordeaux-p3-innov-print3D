import { StatusCodes } from "http-status-codes";
import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { Eye, EyeSlash, PersonPlusFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type {
  RegisterError,
  RegisterErrors,
} from "../../../types/register-errors";
import "./register.css";

function Register() {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const zipCodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onlyLetters = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof RegisterErrors,
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
            zip_code: (zipCodeRef.current as HTMLInputElement).value,
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
        const { details, error } = await response.json();

        if (details) {
          const fieldErrors: RegisterErrors = {};

          for (const err of details as RegisterError[]) {
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
    <>
      <div className="d-flex align-items-center justify-content-start p-3 p-md-5 cart-header-title">
        <h2 className="d-flex align-items-center gap-2 mb-1">
          <PersonPlusFill size={28} />
          S'inscrire
        </h2>
      </div>
      <section className="register m-auto">
        <form className="register-form my-5 container" onSubmit={createAccount}>
          <h1 className="register-header-h1 mb-4">Nouveau client ?</h1>
          <p>Saisissez le formulaire d'inscription :</p>
          <div className="row">
            <div className="form-group col-12 col-md-6">
              <label className="register-label fw-bold" htmlFor="firstname">
                Prénom :
              </label>
              <input
                className="register-input form-control"
                placeholder="Jérôme"
                autoComplete="given-name"
                name="firstname"
                ref={firstnameRef}
                type="text"
                id="firstname"
                onChange={(e) => {
                  setErrors((prev) => ({ ...prev, firstname: "" }));
                  onlyLetters(e, "firstname");
                }}
              />
              {errors.firstname && (
                <p className="text-danger">{errors.firstname}</p>
              )}
            </div>
            <div className="form-group col-12 col-md-6">
              <label className="register-label fw-bold" htmlFor="lastname">
                Nom :
              </label>
              <input
                className="register-input form-control"
                placeholder="Dupont"
                autoComplete="family-name"
                name="lastname"
                ref={lastnameRef}
                type="text"
                id="lastname"
                onChange={(e) => {
                  setErrors((prev) => ({ ...prev, lastname: "" }));
                  onlyLetters(e, "lastname");
                }}
              />
              {errors.lastname && (
                <p className="text-danger">{errors.lastname}</p>
              )}
            </div>
            <div className="form-group col-12 col-md-6">
              <label className="register-label fw-bold" htmlFor="street">
                Voie :
              </label>
              <input
                className="register-input form-control"
                placeholder="33 cours du médoc"
                autoComplete="address-line1"
                name="voie"
                ref={streetRef}
                type="text"
                id="street"
                onChange={() => setErrors((prev) => ({ ...prev, street: "" }))}
              />
              {errors.street && <p className="text-danger">{errors.street}</p>}
            </div>
            <div className="form-group col-12 col-md-6">
              <label className="register-label fw-bold" htmlFor="zip_code">
                Code postal :
              </label>
              <input
                className="register-input form-control"
                placeholder="33000"
                autoComplete="postal-code"
                name="zip_code"
                ref={zipCodeRef}
                type="text"
                id="zip_code"
                onChange={() =>
                  setErrors((prev) => ({ ...prev, zip_code: "" }))
                }
              />
              {errors.zip_code && (
                <p className="text-danger">{errors.zip_code}</p>
              )}
            </div>
            <div className="form-group col-12 col-md-6">
              <label className="register-label fw-bold" htmlFor="city">
                Commune :
              </label>
              <input
                className="register-input form-control"
                placeholder="Bordeaux"
                autoComplete="address-level2"
                name="city"
                ref={cityRef}
                type="text"
                id="city"
                onChange={(e) => {
                  setErrors((prev) => ({ ...prev, city: "" }));
                  onlyLetters(e, "city");
                }}
              />
              {errors.city && <p className="text-danger">{errors.city}</p>}
            </div>
            <div className="form-group col-12 col-md-6">
              <label className="register-label fw-bold" htmlFor="country">
                Pays :
              </label>
              <input
                className="register-input form-control"
                placeholder="France"
                autoComplete="country-name"
                name="country"
                ref={countryRef}
                type="text"
                id="country"
                onChange={(e) => {
                  setErrors((prev) => ({ ...prev, country: "" }));
                  onlyLetters(e, "country");
                }}
              />
              {errors.country && (
                <p className="text-danger">{errors.country}</p>
              )}
            </div>
            <div className="form-group col-12 col-md-6">
              <label className="register-label fw-bold" htmlFor="email">
                Email :
              </label>
              <input
                className="register-input form-control"
                placeholder="dupont@mail.com"
                autoComplete="email"
                name="email"
                ref={emailRef}
                type="email"
                id="email"
                onChange={() => setErrors((prev) => ({ ...prev, email: "" }))}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div className="form-group col-12 col-md-6">
              <label className="register-label fw-bold" htmlFor="phone">
                Téléphone :
              </label>
              <input
                className="register-input form-control"
                placeholder="0655778899"
                autoComplete="tel"
                name="phone"
                ref={phoneRef}
                type="tel"
                id="phone"
                onChange={() => setErrors((prev) => ({ ...prev, phone: "" }))}
              />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
            </div>
            <div className="form-group col-12 col-md-6">
              <label className="register-label fw-bold" htmlFor="password">
                Créer votre mot de passe :
              </label>
              <div className="input-group">
                <input
                  className="register-input form-control"
                  placeholder="••••••••"
                  name="password"
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={() =>
                    setErrors((prev) => ({ ...prev, password: "" }))
                  }
                />
                <button
                  className="register-eye-btn rounded-2"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
            </div>
            <div className="form-group col-12 col-md-6">
              <label
                className="register-label fw-bold"
                htmlFor="confirmPassword"
              >
                Confirmation du mot de passe :
              </label>
              <input
                className="register-input form-control"
                placeholder="••••••••"
                name="confirmPassword"
                ref={confirmPasswordRef}
                type={showPassword ? "text" : "password"}
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
              className="register-cta d-block py-2 fs-6 fw-bold w-75 rounded-4"
              type="submit"
            >
              Créer mon compte
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
