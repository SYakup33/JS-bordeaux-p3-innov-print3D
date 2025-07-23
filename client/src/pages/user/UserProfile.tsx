import { useEffect, useState } from "react";
import {
  Envelope,
  GeoAltFill,
  PencilSquare,
  TelephoneFill,
} from "react-bootstrap-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function UserProfile() {
  const { token } = useAuth();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    zip_code: "",
    country: "",
    email: "",
    phone: "",
  });

  // const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  // const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUser(data);
      } catch {
        setMessage({ text: "Erreur de chargement du profil", type: "danger" });
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
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

      if (!res.ok) throw new Error();
      setMessage({ text: "Profil mis à jour avec succès", type: "success" });
    } catch {
      setMessage({ text: "Erreur lors de la mise à jour", type: "danger" });
    } finally {
      setSubmitting(false);
    }
  };

  // const handleAddressInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setUser({ ...user, street: value });

  //   if (value.length < 3) {
  //     setSuggestions([]);
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
  //         value,
  //       )}&limit=5`,
  //     );
  //     const data = await res.json();
  //     setSuggestions(
  //       data.features.map((f) => ({
  //         label: f.properties.label,
  //         city: f.properties.city,
  //         postcode: f.properties.postcode,
  //       })),
  //     );
  //   } catch (error) {
  //     console.error("Erreur suggestions adresse", error);
  //   }
  // };

  // const handleSelectSuggestion = (suggestion) => {
  //   setUser({
  //     ...user,
  //     street: suggestion.label,
  //     city: suggestion.city,
  //     zip_code: suggestion.postcode,
  //   });
  //   setSuggestions([]);
  // };

  return (
    <section className="mt-5">
      <div
        className="py-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          <div
            className="bg-white bg-opacity-75 rounded-4 shadow-lg p-4 mx-auto"
            style={{ maxWidth: "800px" }}
          >
            <div className="text-center mb-4">
              <img
                src="../../../public/img/icons/lnnovPrintLogo.png"
                alt="Avatar"
                className="rounded-circle shadow"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "4px solid #fff",
                }}
              />
              <h2 className="fw-bold mt-3">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-muted fst-italic">Votre profil personnel</p>
            </div>

            {message.text && (
              <div className={`alert alert-${message.type}`} role="alert">
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  {/* <label className="form-label">Prénom</label> */}
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={user.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  {/* <label className="form-label">Nom</label> */}
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={user.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  {/* <label className="form-label">Adresse</label> */}
                  <div className="position-relative">
                    <div className="input-group">
                      <span className="input-group-text">
                        <GeoAltFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        value={user.street}
                        // onChange={handleAddressInput}
                        placeholder="Commencez à taper une adresse..."
                        autoComplete="off"
                      />
                    </div>
                    {/* {suggestions.length > 0 && (
                      <ul
                        className="list-group shadow-sm position-absolute w-100 mt-1"
                        style={{
                          zIndex: 1050,
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {suggestions.map((s, index) => (
                          <li
                            key={index}
                            className="list-group-item list-group-item-action"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelectSuggestion(s)}
                          >
                            {s.label}
                          </li>
                        ))}
                      </ul>
                    )} */}
                  </div>
                </div>
                <div className="col-md-4">
                  {/* <label className="form-label">Ville</label> */}
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  {/* <label className="form-label">Code Postal</label> */}
                  <input
                    type="text"
                    className="form-control"
                    name="zip_code"
                    value={user.zip_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  {/* <label className="form-label">Pays</label> */}
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={user.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  {/* <label className="form-label">Email</label> */}
                  <div className="input-group">
                    <span className="input-group-text">
                      <Envelope />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  {/* <label className="form-label">Téléphone</label> */}
                  <div className="input-group">
                    <span className="input-group-text">
                      <TelephoneFill />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="text-end mt-4">
                <button
                  type="submit"
                  className="btn btn-dark px-4"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="spinner-border spinner-border-sm me-2" />
                  ) : (
                    <PencilSquare className="me-2" />
                  )}
                  {submitting ? "Mise à jour..." : "Modifier le profil"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
