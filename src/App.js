import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Loading from "./Loading"; // Importe le composant Loading
import Login from "./components/Login";
import Logout from "./components/Logout"; // Importe la page de Logout
import Signup from "./components/Signup"; // Importe la page d'inscription
import Navbar from "./components/Navbar";
import Profile from "./components/Profile"; // Importe la page Profile
import Events from "./Pages/Events"; // Importe la page Events
import Notifications from "./Pages/Notifications"; // Importe la page Notifications
import Settings from "./Pages/Settings"; 
import "./App.css";

const App = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Définir un utilisateur par défaut (ex. un objet utilisateur pour tester)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    photo: "profile.jpg",
  });

  const location = useLocation(); // Utilise useLocation pour accéder à l'URL actuelle

  // Condition pour afficher ou non la navbar en fonction de l'URL
  const shouldShowNavbar =
    location.pathname !== "/notifications" &&
    location.pathname !== "/login" &&
    location.pathname !== "/logout" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/settings" &&
    location.pathname !== "/";

  return (
    <>
      {shouldShowNavbar && <Navbar />} {/* Affiche la Navbar uniquement si la condition est vraie */}
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/events" element={<Events />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile user={user} />} /> {/* Passer 'user' à Profile */}
      </Routes>
    </>
  );
};

export default App;
