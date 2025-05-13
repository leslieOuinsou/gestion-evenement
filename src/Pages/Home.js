import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const fullTitle = "Bienvenue sur EventMaster";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTitle((prev) => prev + fullTitle[index]);
      index++;

      // Lorsque tout le titre est affiché, on arrête l'intervalle
      if (index === fullTitle.length) clearInterval(interval);
    }, 100); // Vitesse de l'animation : 100ms par lettre

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        {/* Afficher l'animation en utilisant la variable 'title' */}
        <h1 className="Bienvenue sur EventMaster">Bienvenue sur EventMaster</h1>

        <p className="hero-subtitle">
          Gérez vos événements de manière simple, efficace et professionnelle.
        </p>
        <p className="hero-description">
          Grâce à notre plateforme, planifiez, invitez et suivez vos événements en toute simplicité, tout en assurant une expérience utilisateur fluide et optimisée.
        </p>
      </header>
    </div>
  );
};

export default Home;
