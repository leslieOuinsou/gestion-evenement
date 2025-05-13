import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Settings.css";

// Utilise les variables d'environnement pour tes clés API
const supabaseUrl ='https://jyclaufhcijeznxmwnjn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5Y2xhdWZoY2lqZXpueG13bmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNDc1ODUsImV4cCI6MjA1NDgyMzU4NX0.Y7a1i-AlGijs6VYqgxbMibMZZ_VlABYf6ofaZtWLZLs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Settings() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [loading, setLoading] = useState(false); // Ajout d'un état de chargement
    const [error, setError] = useState(""); // Pour afficher les erreurs

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            const { data: { user }, error } = await supabase.auth.getUser();
            setLoading(false);
            if (error) {
                setError("Erreur lors de la récupération des données.");
                console.error(error);
            } else {
                setUser(user);
                setUsername(user.user_metadata?.full_name || "");
                setEmail(user.email);
                setAvatar(user.user_metadata?.avatar_url || "default-avatar.png");
            }
        }
        fetchUser();
    }, []);

    async function updateProfile() {
        setLoading(true);
        const { error } = await supabase.auth.updateUser({
            email,
            data: { full_name: username }
        });
        setLoading(false);
        if (error) {
            setError("Erreur lors de la mise à jour du profil.");
            console.error(error);
        } else {
            alert("Profil mis à jour !");
        }
    }

    async function uploadProfilePicture(event) {
        const file = event.target.files[0];
        if (!file) return;

        const filePath = `avatars/${Date.now()}-${file.name}`;
        setLoading(true);
        const { data, error } = await supabase.storage.from("avatars").upload(filePath, file);
        setLoading(false);
        if (error) {
            setError("Erreur lors du téléchargement de l'image.");
            console.error(error);
        } else {
            const imageUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${filePath}`;
            setAvatar(imageUrl);
            await supabase.auth.updateUser({ data: { avatar_url: imageUrl } });
            alert("Image de profil mise à jour !");
        }
    }

    async function changePassword() {
        if (password.length < 6) {
            setError("Le mot de passe doit avoir au moins 6 caractères.");
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        setLoading(false);
        if (error) {
            setError("Erreur lors du changement de mot de passe.");
            console.error(error);
        } else {
            alert("Mot de passe changé !");
        }
    }

    return (
        <div className="settings-container">
            <h1>Paramètres</h1>
            {loading && <div className="loader">Chargement...</div>} {/* Loader pendant le traitement */}

            {error && <div className="error-message">{error}</div>} {/* Affichage des erreurs */}

            <div className="profile-picture">
                <img src={avatar} alt="Avatar" />
                <input type="file" onChange={uploadProfilePicture} />
            </div>

            <div className="settings-form">
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Nom" 
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                />
                <button onClick={updateProfile}>Sauvegarder</button>

                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Nouveau mot de passe" 
                />
                <button onClick={changePassword}>Changer mot de passe</button>
            </div>
        </div>
    );
}
