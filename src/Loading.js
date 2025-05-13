import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState, useRef, useCallback } from "react"; // Ajout de useCallback
import { motion } from "framer-motion";


// 🎨 Génère une couleur dynamique en fonction de la position (curseur ou toucher)
// La fonction utilise window.innerWidth et window.innerHeight pour rester responsive.
const generateColor = (x, y) => {
  const red = Math.floor((x / window.innerWidth) * 255);
  const green = Math.floor((y / window.innerHeight) * 255);
  const blue = Math.floor(((x + y) / (window.innerWidth + window.innerHeight)) * 255);
  return `rgb(${red}, ${green}, ${blue})`;
};

// 🛑 Composant pour une sphère animée
function AnimatedSphere({ position, setColor }) {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const radius = 3;
    // Mouvement circulaire
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + radius * Math.cos(elapsedTime + position[0]);
      meshRef.current.position.z = position[2] + radius * Math.sin(elapsedTime + position[2]);
    }
  });

  // Fonction qui gère à la fois le mouvement de la souris et le toucher
  const handlePointerMove = useCallback((event) => { // Utilisation de useCallback pour la stabilité de la fonction
    let clientX, clientY;

    if (event.type === "mousemove") {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event.type === "touchmove") {
      if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }
    }

    if (clientX !== undefined && clientY !== undefined && meshRef.current) {
      const newColor = generateColor(clientX, clientY);
      meshRef.current.material.color.set(newColor);
      setColor(newColor);
    }
  }, [setColor]); // Ajout de setColor comme dépendance

  useEffect(() => {
    // On écoute à la fois les événements souris et tactile pour rendre le comportement responsive
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, [handlePointerMove]); // Ajout de handlePointerMove comme dépendance

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="rgb(0, 0, 150)" />
    </mesh>
  );
}

const Loading = () => {
  const [color, setColor] = useState("rgb(0, 0, 150)");
  const navigate = useNavigate();

   useEffect(() => {
     const timer = setTimeout(() => {
      navigate("/signup");
     }, 7000);
     return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <div className="app-container">
      <Canvas className="canvas">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <AnimatedSphere position={[0, 0, 0]} setColor={setColor} />
        <AnimatedSphere position={[-2, 1, -2]} setColor={setColor} />
        <AnimatedSphere position={[2, -1, 2]} setColor={setColor} />
        <OrbitControls />
      </Canvas>

      <motion.h1
        className="welcome-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        BIENVENUE SUR NOTRE APPLICATION
      </motion.h1>

      <motion.div
        className="loader"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      />
    </div>
  );
};

export default Loading;
