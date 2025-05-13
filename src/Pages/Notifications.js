import React from "react";

// Composant NotificationsPage
const NotificationsPage = ({ notifications }) => {
  if (!notifications || !Array.isArray(notifications)) {
    return <div>Pas de notifications disponibles</div>;
  }

  return (
    <div>
      {notifications.length === 0 ? (
        <p>Aucune notification</p>
      ) : (
        notifications.map((notification, index) => (
          <div key={index} className={`notification-item ${notification.read ? "read" : "unread"}`}>
            <p>{notification.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationsPage;
