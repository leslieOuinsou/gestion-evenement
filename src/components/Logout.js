// Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprime les données de session (authToken, user, etc.)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirection vers la page d'accueil après un délai de 1 minute
    setTimeout(() => {
      navigate("/home");
    }, 60000); // 60000 ms = 1 minute
  }, [navigate]);

  return (
    <div className="logout-page">
      <div className="message-container">
        <p className="message">Déconnexion en cours...</p>
      </div>
    </div>
  );
};

export default Logout;
