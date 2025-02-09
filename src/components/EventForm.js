import React, { useState } from "react";
import "./EventForm.css";

function EventForm() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    image: null,
    speakers: "",
    program: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setEventData({ ...eventData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Événement créé :", eventData);
  };

  return (
    <div className="event-form-container">
      <h2>Créer un événement</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre :</label>
        <input type="text" name="title" value={eventData.title} onChange={handleChange} required />

        <label>Description :</label>
        <textarea name="description" value={eventData.description} onChange={handleChange} required />

        <label>Lieu :</label>
        <input type="text" name="location" value={eventData.location} onChange={handleChange} required />

        <label>Date :</label>
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required />

        <label>Heure de début :</label>
        <input type="time" name="startTime" value={eventData.startTime} onChange={handleChange} required />

        <label>Heure de fin :</label>
        <input type="time" name="endTime" value={eventData.endTime} onChange={handleChange} required />

        <label>Image de couverture :</label>
        <input type="file" name="image" accept="image/*" onChange={handleImageUpload} />

        <label>Intervenants :</label>
        <input type="text" name="speakers" value={eventData.speakers} onChange={handleChange} />

        <label>Programme :</label>
        <textarea name="program" value={eventData.program} onChange={handleChange} />

        <button type="submit">Créer l’événement</button>
      </form>
    </div>
  );
}

export default EventForm;