import { useEffect, useState } from "react";
import {
  Check2Square,
  Envelope,
  PersonBadge,
  PersonFill,
  Telephone,
  XCircleFill,
} from "react-bootstrap-icons";
import { useAuth } from "../../contexts/AuthContext";
import "./UserProfil.css";
import type { User } from "../../types/user";

type AddressSuggestion = {
  label: string;
  city: string;
  postcode: string;
  name: string;
};

type AdresseAPIResponse = {
  features: {
    properties: AddressSuggestion;
  }[];
};

type UserDétails = Omit<User, "id" | "role" | "created_at" | "password">;

function UserProfile() {
  const { token } = useAuth();

  const [user, setUser] = useState<UserDétails>({
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    zip_code: "",
    country: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [submit, setSubmit] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([]);

  useEffect(() => {
    if (!token) return;

    async function fetchUser() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/myProfile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!response.ok) throw new Error("Erreur lors du chargement");
        const data = await response.json();
        setUser(data);
      } catch {
        setMessage({ text: "Erreur chargement profil", type: "danger" });
      }
    }

    fetchUser();
  }, [token]);

  async function fetchAddressSuggestions(query: string) {
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`,
      );

      const data: AdresseAPIResponse = await response.json();

      const suggestions = data.features.map((f) => ({
        label: f.properties.label,
        city: f.properties.city,
        postcode: f.properties.postcode,
        name: f.properties.name,
      }));

      setAddressSuggestions(suggestions);
    } catch (err) {
      console.error("Erreur suggestions adresse :", err);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "street" && value.length >= 3) {
      fetchAddressSuggestions(value);
    } else if (name === "street") {
      setAddressSuggestions([]);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmit(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Erreur de mise à jour");

      setMessage({ text: "Profil mis à jour avec succès !", type: "success" });
    } catch {
      setMessage({ text: "Erreur lors de la mise à jour", type: "danger" });
    } finally {
      setSubmit(false);
    }
  }

  return (
    <section>
      <div className="d-flex align-items-center justify-content-start p-3 p-md-5 cart-header-title">
        <h2 className="d-flex align-items-center gap-2 mb-1">
          <PersonFill size={28} />
          Mon Profil
        </h2>
      </div>

      <div className="container py-3 user-profil-container">
        <div className="row rounded-4 overflow-hidden shadow-lg">
          <div className="col-12 col-md-4 d-flex flex-column user-profil-badge align-items-center justify-content-center p-4 user-profil-sidebar">
            <PersonBadge size={100} className="mb-3" />
            <h3 className="text-center mb-0 fw-bold">
              {user.firstname} {user.lastname}
            </h3>
            <small className="fst-italic mt-1 text-muted">Ma fiche perso</small>
          </div>

          <div className="col-12 col-md-8 p-5">
            <h3 className="mb-4 border-bottom pb-3 fw-medium">
              Informations personnelles
            </h3>

            {message.text && (
              <div
                className={`alert d-flex align-items-center gap-2 py-2 px-3 rounded-3 ${
                  message.type === "success" ? "alert-success" : "alert-danger"
                }`}
              >
                {message.type === "success" ? (
                  <Check2Square />
                ) : (
                  <XCircleFill />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={onSubmit}>
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="firstname"
                    className="form-label fw-medium user-profil-label"
                  >
                    Prénom
                  </label>
                  <div className="input-group user-profil-input border shadow-sm rounded">
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={user.firstname}
                      onChange={onChange}
                      placeholder="Prénom"
                      className="form-control border-0 bg-transparent"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="lastname"
                    className="form-label fw-medium user-profil-label"
                  >
                    Nom
                  </label>
                  <div className="input-group user-profil-input border shadow-sm rounded">
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={user.lastname}
                      onChange={onChange}
                      placeholder="Nom"
                      className="form-control border-0 bg-transparent"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 position-relative">
                  <label
                    htmlFor="street"
                    className="form-label fw-medium user-profil-label"
                  >
                    Rue
                  </label>
                  <div className="input-group user-profil-input border shadow-sm rounded">
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={user.street}
                      onChange={onChange}
                      placeholder="Rue"
                      className="form-control border-0 bg-transparent"
                    />
                  </div>

                  {addressSuggestions.length > 0 && (
                    <ul className="list-group position-absolute mt-2 w-100 z-3">
                      {addressSuggestions.map((suggestion, index) => (
                        <li
                          key={`${suggestion.label}-${index}`}
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            setUser((prev) => ({
                              ...prev,
                              street: suggestion.label,
                              city: suggestion.city,
                              zip_code: suggestion.postcode,
                            }));
                            setAddressSuggestions([]);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.click();
                          }}
                        >
                          {suggestion.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="city"
                    className="form-label fw-medium user-profil-label"
                  >
                    Ville
                  </label>
                  <div className="input-group user-profil-input border shadow-sm rounded">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={user.city}
                      onChange={onChange}
                      placeholder="Ville"
                      className="form-control border-0 bg-transparent"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="zip_code"
                    className="form-label fw-medium user-profil-label"
                  >
                    Code Postal
                  </label>
                  <div className="input-group user-profil-input border shadow-sm rounded">
                    <input
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      value={user.zip_code}
                      onChange={onChange}
                      placeholder="Code Postal"
                      className="form-control border-0 bg-transparent"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="country"
                    className="form-label fw-medium user-profil-label"
                  >
                    Pays
                  </label>
                  <div className="input-group user-profil-input border shadow-sm rounded">
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={user.country}
                      onChange={onChange}
                      placeholder="Pays"
                      className="form-control border-0 bg-transparent"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="email"
                    className="form-label fw-medium user-profil-label"
                  >
                    Email
                  </label>
                  <div className="input-group user-profil-input border shadow-sm rounded">
                    <span className="input-group-text user-profil-icons">
                      <Envelope />
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={onChange}
                      placeholder="Email"
                      className="form-control border-0 bg-transparent"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="phone"
                    className="form-label fw-medium user-profil-label"
                  >
                    Téléphone
                  </label>
                  <div className="input-group user-profil-input border shadow-sm rounded">
                    <span className="input-group-text user-profil-icons">
                      <Telephone />
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={user.phone}
                      onChange={onChange}
                      placeholder="Téléphone"
                      className="form-control border-0 bg-transparent"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submit}
                className="btn btn-outline-secondary fs-5 mt-5 w-100 user-profil-submit text-light fw-bold py-2 rounded-4"
              >
                Mise à jour
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
