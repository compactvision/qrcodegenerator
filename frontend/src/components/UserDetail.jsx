import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QrScanner from "react-qr-scanner";

export default function UserDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${id}`
        ); // Remplacez par votre API
        setUser(response.data);
      } catch (error) {
        setError(
          "Erreur lors de la récupération des détails de l'utilisateur."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      setLoading(true);
      try {
        // Supposons que `data` est l'URL contenant l'ID de l'utilisateur
        const response = await axios.get(
          `http://localhost:8000/api/user/${id}`
        );
        setUser(response.data);
      } catch (err) {
        setError(
          "Erreur lors de la récupération des détails de l'utilisateur."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Erreur lors du scan : " + err.message);
  };

  console.log(user);

  if (!user) {
    return <div>Aucun utilisateur trouvé.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h3>
        Code QR généré : {user.nom}, {user.prenom}
      </h3>
      <img src={user.qrcode_image} alt="Code QR" />
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment"
        style={{ width: "100%" }}
      />
      {loading && <div>Chargement...</div>}
      {error && <div>{error}</div>}
      {user && (
        <div>
          <h2>Détails de l'utilisateur</h2>
          <p>Nom: {user.nom}</p>
          <p>Prénom: {user.prenom}</p>
          <p>Postnom: {user.postnom}</p>
          <p>Date de naissance: {user.date_de_naissance}</p>
          <p>Lieu de naissance: {user.lieu_de_naissance}</p>
          <p>Metier: {user.metier}</p>
          <p>Formation suivie: {user.formation_suivie}</p>
          <p>Competences: {user.competences}</p>
          <p>Periode de validité: jusqu'en {user.periode_validite}</p>
        </div>
      )}
    </div>
  );
}