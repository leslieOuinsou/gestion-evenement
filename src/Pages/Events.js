import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { format } from 'date-fns'; // Ajout de l'importation de format
import "./Events.css";

const fakeEvents = [
  {
    id: 1,
    title: "Concert Live",
    date: "2025-03-15",
    location: "Paris, France",
    image_url: "/images/concertlive.jpg",
    description: "Un concert exceptionnel avec des artistes talentueux.",
  },
  {
    id: 2,
    title: "Exposition d'Art",
    date: "2025-04-10",
    location: "Louvre, Paris",
    image_url: "/images/Exposition.jpg",
    description: "Découvrez les œuvres d'artistes contemporains.",
  },
  {
    id: 3,
    title: "Conférence Tech",
    date: "2025-05-20",
    location: "Station F, Paris",
    image_url: "/images/cc.webp",
    description: "Un événement pour les passionnés de nouvelles technologies.",
  },
  {
    id: 4,
    title: "Festival de Cinéma",
    date: "2025-06-05",
    location: "Cannes, France",
    image_url: "/images/cinema.jpeg",
    description: "Découvrez les avant-premières des meilleurs films de l'année.",
  },
  {
    id: 5,
    title: "Salon du Livre",
    date: "2025-07-12",
    location: "Lyon, France",
    image_url: "/images/Salon.jpg",
    description: "Rencontrez vos auteurs préférés et découvrez de nouveaux livres.",
  },
  {
    id: 6,
    title: "Marathon International",
    date: "2025-09-22",
    location: "Marseille, France",
    image_url: "/images/marathon.jpg",
    description: "Participez à l'un des marathons les plus populaires d'Europe.",
  },
  {
    id: 7,
    title: "Gaming Expo",
    date: "2025-10-30",
    location: "Bordeaux, France",
    image_url: "/images/Gaming.jpg",
    description: "Découvrez les dernières innovations du monde du gaming.",
  },
  {
    id: 8,
    title: "Marché de Noël",
    date: "2025-12-15",
    location: "Strasbourg, France",
    image_url: "/images/noel.jpg",
    description: "Profitez de l'ambiance festive et des spécialités locales.",
  },
  {
    id: 9,
    title: "Festival des Arts de la Rue",
    date: "2025-09-12",
    location: "Aix-en-Provence, France",
    image_url: "/images/Arts.jpg",
    description: "Venez découvrir des performances artistiques en plein air, dans les rues d'Aix-en-Provence.",
  },
  {
    id: 10,
    title: "Exposition Scientifique",
    date: "2025-10-15",
    location: "Cité des Sciences, Paris",
    image_url: "/images/Scientifique.jpeg",
    description: "Un événement pour découvrir les dernières avancées scientifiques et technologiques.",
  },
  {
    id: 11,
    title: "Festival de Musique Electronique",
    date: "2025-08-05",
    location: "Lille, France",
    image_url: "/images/Festival.webp",
    description: "Venez vibrer au rythme de la musique électronique avec des DJ internationaux.",
  },
  {
    id: 12,
    title: "Compétition de Cuisine",
    date: "2025-11-18",
    location: "Paris, France",
    image_url: "/images/Cuisine.webp",
    description: "Participez à une compétition de cuisine avec des chefs renommés.",
  },
];

const promotionWeeks = [
  [], // Semaine 1
  [1, 2, 3], // Semaine 2 (exemple d'événements promotionnels)
  [], // Semaine 3
  [4, 5, 6], // Semaine 4 (exemple d'événements promotionnels)
];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [promotionMessage, setPromotionMessage] = useState("");
  const [promotionEndTime, setPromotionEndTime] = useState(null);
  const [showPromotionEvents, setShowPromotionEvents] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api.openagenda.com/v2/events?oaq[location]=France');
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        setEvents(fakeEvents);
      }
    };

    fetchEvents();

    const interval = setInterval(fetchEvents, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startDate) / (24 * 60 * 60 * 1000));
    const week = Math.ceil(days / 7);
    setCurrentWeek(week);
    console.log(setCurrentWeek(week));
    console.log(startDate );
    console.log(days);
    console.log(week);
    const weekPromotions = promotionWeeks[currentWeek % promotionWeeks.length];
    if (weekPromotions.length > 0) {
      setPromotionMessage("🎉 Profitez de notre promotion de la semaine ! 🎟️");

      const endTime = new Date(now.getTime() + 72 * 60 * 60 * 1000);
      setPromotionEndTime(endTime);

      const timer = setTimeout(() => {
        setPromotionMessage("");
      }, 72 * 60 * 60 * 1000);

      return () => clearTimeout(timer);
    } else {
      setPromotionMessage("");
    }
  }, [currentWeek]);

  const isPromotionWeek = (eventId) => {
    const weekPromotions = promotionWeeks[currentWeek % promotionWeeks.length];
    return weekPromotions.includes(eventId);
  };

  const updatedEvents = events.map((event) => ({
    ...event,
    promotion: isPromotionWeek(event.id),
  }));

  const filteredEvents = updatedEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const promotionEvents = updatedEvents.filter((event) => event.promotion);

  return (
    <div>
   

      {promotionMessage && (
        <div className="promo-banner">
          <p>{promotionMessage}</p>
          <button
            className="btn-promo"
            onClick={() => setShowPromotionEvents(!showPromotionEvents)}
          >
            Voir les événements {showPromotionEvents ? "normaux" : "en promotion"}
          </button>
        </div>
      )}

      <div className="events-page">
        <h1>Événements</h1>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un événement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="events-list">
          {(showPromotionEvents ? promotionEvents : filteredEvents).length === 0 ? (
            <p>Aucun événement trouvé.</p>
          ) : (
            (showPromotionEvents ? promotionEvents : filteredEvents).map((event) => (
              <div key={event.id} className="event-card">
                <img src={event.image_url} alt={event.title} className="event-img" />
                <h2>
                  {event.title}
                  {event.promotion && <span className="promo-badge">Promotion</span>}
                </h2>
                <p><FaCalendarAlt /> {format(new Date(event.date), 'dd/MM/yyyy')}</p> {/* Date formatée */}
                <p><FaMapMarkerAlt /> {event.location}</p>
                <p>{event.description}</p>
                <Link to={`/event/${event.id}`} className="btn-details">
                  Voir détails <FaTicketAlt />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
