import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../Lib/Bdd"; // Assure-toi que le chemin est correct
import "./Signup.css"; // Un fichier CSS pour le style

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Inscription via Supabase
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
      },);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Inscription réussie ! Vérifiez votre e-mail.");
      setTimeout(() => navigate("/login"), 4000); // Redirection après 3s
    }
  };

  return (
    <div className="bod signup-container">
      <div className="signup-card">
        <h2>Inscription</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSignup}>
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
              placeholder="Entrez un mot de passe"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirmez le mot de passe</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>
          <button type="submit" className="signup-button">
            S'inscrire
          </button>
        </form>
        <p className="login-link">
          Déjà inscrit ? <a href="/login">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
