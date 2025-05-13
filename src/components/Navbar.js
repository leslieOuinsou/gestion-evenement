// Navbar.js
import { Link, useLocation } from "react-router-dom";
import { HiHome, HiCalendar, HiUserCircle, HiCog, HiLogout, HiTicket } from "react-icons/hi";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pink-80 transition ${
      isActive(path) ? "text-pink-700 font-semibold bg-pink-100" : "text-gray-700"
    }`;

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo animé avec Framer Motion */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 2 }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link to="/home" className="flex items-center gap-2 text-2xl font-extrabold text-black-600">
            EventMaster
          </Link>
        </motion.div>

        {/* Menu Burger pour Mobile */}
        <div className="block lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Liens de navigation sur Desktop */}
        <ul className={`hidden lg:flex gap-4`}>
          <li>
            <Link to="/home" className={navLinkClass("/home")}>
              <HiHome className="text-xl" />
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/events" className={navLinkClass("/events")}>
              <HiCalendar className="text-xl" />
              Événements
            </Link>
          </li>
          <li>
            <Link to="/profile" className={navLinkClass("/profile")}>
              <HiUserCircle className="text-xl" />
              Profil
            </Link>
          </li>
          <li>
            <Link to="/settings" className={navLinkClass("/settings")}>
              <HiCog className="text-xl" />
              Paramètres
            </Link>
          </li>
          <li>
            <Link to="/tickets" className={navLinkClass("/tickets")}>
              <HiTicket className="text-xl" />
              Billets
            </Link>
          </li>
          {/* Bouton de déconnexion */}
          <li>
            <Link to="/logout" className={navLinkClass("/logout")}>
              <HiLogout className="text-xl" />
              Déconnexion
            </Link>
          </li>
        </ul>

        {/* Menu Burger pour Mobile */}
        {isMenuOpen && (
          <ul className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
            <li>
              <Link to="/home" className={navLinkClass("/home")}>
                <HiHome className="text-xl" />
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/events" className={navLinkClass("/events")}>
                <HiCalendar className="text-xl" />
                Événements
              </Link>
            </li>
            <li>
              <Link to="/profile" className={navLinkClass("/profile")}>
                <HiUserCircle className="text-xl" />
                Profil
              </Link>
            </li>
            <li>
              <Link to="/settings" className={navLinkClass("/settings")}>
                <HiCog className="text-xl" />
                Paramètres
              </Link>
            </li>
            <li>
              <Link to="/tickets" className={navLinkClass("/tickets")}>
                <HiTicket className="text-xl" />
                Billets
              </Link>
            </li>
            {/* Bouton de déconnexion dans le menu mobile */}
            <li>
              <Link to="/logout" className={navLinkClass("/logout")}>
                <HiLogout className="text-xl" />
                Déconnexion
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
