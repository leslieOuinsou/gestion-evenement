// src/components/Astronaut.js
import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

const Astronaut = () => {
  const model = useLoader(ColladaLoader, '/models/AstroStitch_02.dae');
  const ref = useRef();

  // Animation : faire tourner l'astronaute continuellement
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;  // Rotation lente de l'astronaute
    }
  });

  // Optionnel : Ajuster l'orientation ou la taille du modèle si nécessaire
  useEffect(() => {
    if (model && ref.current) {
      ref.current.rotation.y = Math.PI;  // Optionnel, ajuster l'orientation du modèle si nécessaire
    }
  }, [model]);

  return model ? (
    <primitive 
      ref={ref} 
      object={model.scene} 
      scale={[3, 3, 3]} // Augmente la taille (par exemple ici de 3x)
      position={[0, 0, 0]}  // Centrer l'objet au milieu de la scène
    />
  ) : null;
};

export default Astronaut;
