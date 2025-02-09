import React, { useState } from "react";
import "./Navbar.css";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li><a href="#home">Accueil</a></li>
        <li><a href="#about">À propos</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
