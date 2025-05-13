import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";  // Nous ajouterons du style dans un fichier CSS
import supabase from "../Lib/Bdd";


const Login = () => {
  const [email, setEmail] = useState(""); // Stocke l'email
  const [password, setPassword] = useState(""); // Stocke le mot de passe
  const [error, setError] = useState(""); // Message d'erreur (si login échoue)
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

// Logique de validation simple (à adapter selon ton backend)
// if (email === "user@example.com" && password === "password123") {
// navigate("/navbar"); // Redirection vers la page Navbar (ou dashboard par exemple)
// } else {
// setError("Identifiants invalides. Veuillez réessayer.");
// }
try {
  const { data, error } = await supabase.auth.signInWithPassword({   email,   password, }); 
  if (error) {
    setError(error.message);
  } else {
    navigate("/Home"); // Redirection vers la page Navbar (ou dashboard par exemple)
  }

} catch (err) {
  setError('Erreur inattendue lors de la connexion');
} 
  };

  return (
    <div className="body login-container">
      <div className="login-card">
        <h2>Connexion</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
        <p className="forgot-password">
          <a href="/forgot-password">Mot de passe oublié ?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
