import { StatusCodes } from "http-status-codes";
import { useRef } from "react";
import type { FormEventHandler } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Register() {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const zip_codeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

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
            email: (emailRef.current as HTMLInputElement).value,
            phone: (phoneRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
            confirmPassword: (confirmPasswordRef.current as HTMLInputElement)
              .value,
          }),
        },
      );

      if (response.status === StatusCodes.CREATED) {
        navigate("/login");
        toast.success("Votre compte a été créé avec succès !");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <form onSubmit={createAccount}>
        <div>
          <label htmlFor="firstname">Prénom :</label>
          <input ref={firstnameRef} type="firstname" id="firstname" />
        </div>
        <div>
          <label htmlFor="lastname">Nom :</label>
          <input ref={lastnameRef} type="lastname" id="lastname" />
        </div>
        <div>
          <label htmlFor="street">Voie :</label>
          <input ref={streetRef} type="street" id="street" />
        </div>
        <div>
          <label htmlFor="zip_code">Code postal :</label>
          <input ref={zip_codeRef} type="zip_code" id="zip_code" />
        </div>
        <div>
          <label htmlFor="city">Commune :</label>
          <input ref={cityRef} type="city" id="city" />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input ref={emailRef} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="phone">Téléphone :</label>
          <input ref={phoneRef} type="phone" id="phone" />
        </div>
        <div>
          <label htmlFor="password">Créer votre mot de passe :</label>
          <input ref={passwordRef} type="passsword" id="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">
            Confirmer votre mot de passe :
          </label>
          <input
            ref={confirmPasswordRef}
            type="confirmPasssword"
            id="confirmPassword"
          />
        </div>
        <button type="submit">Créer mon compte</button>
      </form>
    </section>
  );
}

export default Register;
