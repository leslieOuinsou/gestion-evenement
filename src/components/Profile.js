import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../Lib/Bdd"; // Assure-toi que le chemin est correct

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const user = supabase.auth.user();
      if (!user) {
        navigate("/login");
        return;
      }

      // Récupération des informations supplémentaires depuis la table 'users'
      const { data, error } = await supabase
        .from("users")
        .select("first_name, last_name, address")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erreur de récupération des données utilisateur:", error.message);
      } else {
        setUserData(data);
      }
    };

    getUserData();
  }, [navigate]);

  return (
    <div className="profile-container">
      <h2>Profil</h2>
      {userData ? (
        <div>
          <p><strong>Prénom :</strong> {userData.first_name}</p>
          <p><strong>Nom :</strong> {userData.last_name}</p>
          <p><strong>Adresse :</strong> {userData.address}</p>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default Profile;
