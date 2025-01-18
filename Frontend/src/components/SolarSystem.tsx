import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Sun Component
const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);

  // Rotate the Sun
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial emissive="orange" emissiveIntensity={2} />
    </mesh>
  );
};

// Planet Component
const Planet = ({
  radius,
  size,
  color,
  name,
  rotationSpeed = 0.01,
  orbitSpeed = 0.01,
  setHoveredPlanet,
}: {
  radius: number;
  size: number;
  color: string;
  name: string;
  rotationSpeed?: number;
  orbitSpeed?: number;
  setHoveredPlanet: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const [angle, setAngle] = useState(0); // To keep track of the orbit angle

  // Rotate the Planet on its axis
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed; // Planet's own rotation
    }
    // Rotate the Planet on its orbit around the Sun
    setAngle((prevAngle) => prevAngle + orbitSpeed); // Update orbit angle

    if (planetRef.current) {
      planetRef.current.position.x = Math.cos(angle) * radius; // Update x position based on angle
      planetRef.current.position.z = Math.sin(angle) * radius; // Update z position based on angle
    }
  });

  return (
    <mesh
      ref={planetRef}
      position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} // Initial position on the orbit
      onPointerOver={() => setHoveredPlanet(name)} // Show name on hover
      onPointerOut={() => setHoveredPlanet(null)} // Hide name when not hovering
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Orbit Component
const Orbit = ({ radius }: { radius: number }) => {
  const points = [];
  const segments = 100;

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }

  return <Line points={points} color="white" lineWidth={1} />;
};

// SolarSystem Component
const SolarSystem: React.FC = () => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Canvas style={{ height: '100%' }}>
        {/* Camera Controls */}
        <OrbitControls enableZoom={true} enablePan={true} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={1.5} />

        {/* Sun */}
        <Sun />

        {/* Orbits */}
        <Orbit radius={5} /> {/* Mercury */}
        <Orbit radius={8} /> {/* Venus */}
        <Orbit radius={12} /> {/* Earth */}
        <Orbit radius={16} /> {/* Mars */}
        <Orbit radius={22} /> {/* Jupiter */}
        <Orbit radius={30} /> {/* Saturn */}
        <Orbit radius={38} /> {/* Uranus */}
        <Orbit radius={46} /> {/* Neptune */}

        {/* Planets */}
        <Planet
          radius={5}
          size={0.5}
          color="gray"
          name="Mercury"
          rotationSpeed={0.02}
          orbitSpeed={0.02}
          setHoveredPlanet={setHoveredPlanet}
        />
        <Planet
          radius={8}
          size={0.8}
          color="orange"
          name="Venus"
          rotationSpeed={0.015}
          orbitSpeed={0.015}
          setHoveredPlanet={setHoveredPlanet}
        />
        <Planet
          radius={12}
          size={1}
          color="blue"
          name="Earth"
          rotationSpeed={0.01}
          orbitSpeed={0.01}
          setHoveredPlanet={setHoveredPlanet}
        />
        <Planet
          radius={16}
          size={0.8}
          color="red"
          name="Mars"
          rotationSpeed={0.008}
          orbitSpeed={0.008}
          setHoveredPlanet={setHoveredPlanet}
        />
        <Planet
          radius={22}
          size={1.5}
          color="orange"
          name="Jupiter"
          rotationSpeed={0.005}
          orbitSpeed={0.005}
          setHoveredPlanet={setHoveredPlanet}
        />
        <Planet
          radius={30}
          size={1.2}
          color="yellow"
          name="Saturn"
          rotationSpeed={0.004}
          orbitSpeed={0.004}
          setHoveredPlanet={setHoveredPlanet}
        />
        <Planet
          radius={38}
          size={1}
          color="lightblue"
          name="Uranus"
          rotationSpeed={0.003}
          orbitSpeed={0.003}
          setHoveredPlanet={setHoveredPlanet}
        />
        <Planet
          radius={46}
          size={1}
          color="blue"
          name="Neptune"
          rotationSpeed={0.002}
          orbitSpeed={0.002}
          setHoveredPlanet={setHoveredPlanet}
        />
      </Canvas>

      {/* Display Planet Name */}
      {hoveredPlanet && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {hoveredPlanet}
        </div>
      )}
    </div>
  );
};

export default SolarSystem;
