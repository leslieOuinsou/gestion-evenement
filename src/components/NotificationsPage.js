import React, { useState } from "react";
import "./NotificationsPage.css";

const NotificationsPage = () => {
  // Simuler des notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nouveau message dans votre boîte de réception", read: false },
    { id: 2, message: "Rappel: Réunion à 14h", read: false },
    { id: 3, message: "Mise à jour de votre profil disponible", read: true },
  ]);

  // Fonction pour marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>Aucune notification</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`notification-item ${notification.read ? "read" : "unread"}`}
          >
            <p>{notification.message}</p>
            <span>{notification.read ? "Lue" : "Non lue"}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationsPage;
