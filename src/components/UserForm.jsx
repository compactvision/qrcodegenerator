import { useState } from "react";
import "./UserForm.scss";
import "../index.scss";
import axios from "axios";

const UserForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    date_de_naissance: "",
    lieu_de_naissance: "",
    metier: "",
    formation_suivie: "",
    competences: "",
    periode_validite: "",
  });
  const [qrCodePath, setQrCodePath] = useState(null);
  const [errors, setErrors] = useState({}); // État pour les erreurs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Utilisateur créé:", response.data);
      setQrCodePath(response.data.qr_code);
      setErrors({}); // Réinitialiser les erreurs
    } catch (error) {
      if (error.response) {
        console.error("Erreur de validation:", error.response.data.errors);
        setErrors(error.response.data.errors); // Mettre à jour l'état avec les erreurs
      } else {
        console.error("Erreur lors de la soumission du formulaire:", error);
      }
    }
  };

  console.log(qrCodePath)

  return (
    <div className="user-form">
      {qrCodePath ? (
        <div>
          <h3>Code QR généré :</h3>
          <img src={qrCodePath} alt="Code QR" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="user-form__container">
          <h2>Formulaire d'Identification</h2>

          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={key === "date_de_naissance" || key === "periode_validite" ? "date" : "text"}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
              {errors[key] && <span className="error">{errors[key][0]}</span>} {/* Afficher l'erreur si présente */}
            </div>
          ))}

          <button type="submit">Soumettre</button>
        </form>
      )}
    </div>
  );
};

export default UserForm;