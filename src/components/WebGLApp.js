import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

const WebGLApp = () => {
  useEffect(() => {
    // 🎬 1. Initialisation de la scène, de la caméra et du rendu
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 💡 2. Ajouter une lumière pour voir le modèle
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    scene.add(light);

    // 🚀 3. Charger l’astronaute
    const loader = new GLTFLoader();
    loader.load('/models/AstroStitch_02.glb', (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 2, 0); // Position initiale au-dessus de l'écran
      model.scale.set(0.5, 0.5, 0.5);
      scene.add(model);

      // 🏃‍♂️ 4. Animation de descente avec GSAP
      gsap.to(model.position, {
        y: 0,
        duration: 2,
        ease: 'bounce.out'
      });

      // 🎥 Animation de la scène
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    });

    // 📏 Ajuster la taille au redimensionnement de l’écran
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    camera.position.z = 5; // Positionner la caméra
  }, []);

  return null; // Le rendu est directement ajouté au body
};

export default WebGLApp;
