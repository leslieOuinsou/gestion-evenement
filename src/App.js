import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./App.css";

// Fonction pour créer la sphère avec un mouvement circulaire
function Animated3DModel() {
  const meshRef = useRef(null);

  // Utilisation de useFrame pour animer la sphère
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime(); // Temps écoulé
    const radius = 3; // Rayon du cercle

    // Déplacer la sphère le long d'un cercle
    meshRef.current.position.x = radius * Math.cos(elapsedTime); // Position sur l'axe X
    meshRef.current.position.z = radius * Math.sin(elapsedTime); // Position sur l'axe Z
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [loading, navigate]);

  return (
    <div className="app-container">
      <Canvas className="canvas">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Animated3DModel />
        <OrbitControls />
      </Canvas>
      <motion.h1
        className="welcome-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        onAnimationComplete={() => setLoading(true)}
      >
        Bienvenue sur notre application
      </motion.h1>
      {loading && <motion.div className="loader" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />}
    </div>
  );
}
