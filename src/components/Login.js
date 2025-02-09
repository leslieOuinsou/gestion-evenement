// Login.js
import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page">
        <div className="bills-background">
  <div className="bill"></div>
  <div className="bill"></div>
  <div className="bill"></div>
</div>

      <div className="login-container">
        <h1>Connexion</h1>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Entrez votre email" required />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" placeholder="Entrez votre mot de passe" required />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
