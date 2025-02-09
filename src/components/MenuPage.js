// components/MenuPage.js
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./MenuPage.css"; // Fichier CSS pour le style

function MenuPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simule un chargement de 2 secondes
  }, []);

  return (
    <div className="menu-page dark-mode">
      <Navbar />
      {loading ? (
        <div className="loading-screen">Chargement du menu...</div>
      ) : (
        <div className="content">Contenu de la page</div>
      )}
    </div>
  );
}

export default MenuPage;
