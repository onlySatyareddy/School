import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 1. School Gate
const SchoolGate = ({ isOpen }) => {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();

  useFrame(() => {
    // Gate rotation logic
    const targetLeft = isOpen ? -Math.PI / 2 : 0;
    const targetRight = isOpen ? Math.PI / 2 : 0;
    
    // Smooth rotation using lerp
    leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(leftDoorRef.current.rotation.y, targetLeft, 0.02);
    rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(rightDoorRef.current.rotation.y, targetRight, 0.02);
  });

  return (
    <group position={[0, 0, 8]}>
      {/* Pillars */}
      <mesh position={[-3.5, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 8, 1]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
      </mesh>
      <mesh position={[3.5, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 8, 1]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
      </mesh>

      {/* Top Arch */}
      <mesh position={[0, 8.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 1, 1]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>

      {/* Left Door */}
      <group position={[-3, 0, 0]} ref={leftDoorRef}>
        <mesh position={[1.5, 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 8, 0.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
      </group>

      {/* Right Door */}
      <group position={[3, 0, 0]} ref={rightDoorRef}>
        <mesh position={[-1.5, 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 8, 0.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

// 2. Garden (Ground)
const Garden = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <planeGeometry args={[200, 200]} />
    <meshStandardMaterial color="#4ade80" roughness={0.8} /> {/* Green */}
  </mesh>
);

// Animated Fountain Component
const Fountain = () => {
  const waterRef = useRef();
  useFrame(({ clock }) => {
    if(waterRef.current) {
      waterRef.current.position.y = 3 + Math.sin(clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <group position={[0, 0, -15]}>
      {/* Pool Base */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4, 0.4, 32]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      {/* Water */}
      <mesh position={[0, 0.35, 0]} receiveShadow>
        <cylinderGeometry args={[3.8, 3.8, 0.2, 32]} />
        <meshPhysicalMaterial color="#38bdf8" transmission={0.9} opacity={0.8} transparent roughness={0.1} />
      </mesh>
      {/* Fountain Center Pillar */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.8, 3, 16]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Animated Water Top */}
      <mesh position={[0, 3, 0]} ref={waterRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshPhysicalMaterial color="#bae6fd" transmission={0.8} transparent roughness={0.1} />
      </mesh>
    </group>
  );
};

// 3. Pathway
const Pathway = () => (
  <group>
    <mesh position={[0, 0.01, -10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[6, 50]} />
      <meshStandardMaterial color="#94a3b8" roughness={0.7} />
    </mesh>
    <Fountain />
  </group>
);

// 4. Main Building (Modern Smart Campus)
const MainBuilding = () => (
  <group position={[0, 0, -35]}>
    {/* Main Central Hub (Glass Architecture) */}
    <mesh position={[0, 12, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[15, 18, 24, 32]} />
      <meshPhysicalMaterial 
        color="#0f172a" 
        metalness={0.9} 
        roughness={0.1} 
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent={true}
        opacity={0.8}
        transmission={0.5} // glass effect
        ior={1.5}
      />
    </mesh>
    
    {/* Inner Core of Central Hub (Glowing) */}
    <mesh position={[0, 12, 0]}>
      <cylinderGeometry args={[10, 12, 22, 16]} />
      <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.5} />
    </mesh>

    {/* Left Academic Wing */}
    <mesh position={[-25, 8, 5]} castShadow receiveShadow>
      <boxGeometry args={[25, 16, 12]} />
      <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
    </mesh>

    {/* Right Science Wing */}
    <mesh position={[25, 8, 5]} castShadow receiveShadow>
      <boxGeometry args={[25, 16, 12]} />
      <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
    </mesh>

    {/* Connector Bridges */}
    <mesh position={[-12, 10, 2]} castShadow receiveShadow>
      <boxGeometry args={[10, 4, 6]} />
      <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={0.6} transparent ior={1.4} roughness={0.1} />
    </mesh>
    <mesh position={[12, 10, 2]} castShadow receiveShadow>
      <boxGeometry args={[10, 4, 6]} />
      <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={0.6} transparent ior={1.4} roughness={0.1} />
    </mesh>

    {/* Entrance Canopy */}
    <mesh position={[0, 5, 18]} castShadow receiveShadow>
      <boxGeometry args={[12, 1, 8]} />
      <meshStandardMaterial color="#334155" />
    </mesh>
    <mesh position={[-5, 2.5, 21]} castShadow receiveShadow>
      <cylinderGeometry args={[0.3, 0.3, 5]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
    <mesh position={[5, 2.5, 21]} castShadow receiveShadow>
      <cylinderGeometry args={[0.3, 0.3, 5]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
  </group>
);

// Trees to make the garden look real
const Trees = () => {
  const positions = [
    [-8, 0, -2], [8, 0, -2],
    [-10, 0, -12], [10, 0, -12],
    [-14, 0, -25], [14, 0, -25],
    [-20, 0, -15], [20, 0, -15],
    [-30, 0, -10], [30, 0, -10],
    [-35, 0, -20], [35, 0, -20],
  ];
  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Trunk */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.4, 3]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          {/* Leaves */}
          <mesh position={[0, 4, 0]} castShadow>
            <icosahedronGeometry args={[2.5, 1]} />
            <meshStandardMaterial color="#166534" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Camera Animation Rig
const CameraRig = ({ isOpen }) => {
  useFrame((state) => {
    if (isOpen) {
      // Move camera forward into the campus using lerp
      state.camera.position.lerp(new THREE.Vector3(0, 4, -10), 0.015);
    }
  });
  return null;
};

const EntryScene = ({ onEnter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEnterClick = () => {
    setIsOpen(true);
    // Trigger the rest of the application after animation
    if (onEnter) {
      setTimeout(onEnter, 4000); // Wait 4 seconds for camera animation
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [0, 5, 20], fov: 50 }}>
        <CameraRig isOpen={isOpen} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[15, 30, 15]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={100}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        
        <Suspense fallback={null}>
          {/* HDRI Environment */}
          <Environment preset="sunset" background />
          
          <Garden />
          <Pathway />
          <SchoolGate isOpen={isOpen} />
          <MainBuilding />
          <Trees />
        </Suspense>

        {/* Interaction Controls */}
        <OrbitControls 
          enabled={!isOpen} // Disable controls during animation
          maxPolarAngle={Math.PI / 2 - 0.05} // Keep above ground
          minPolarAngle={Math.PI / 4}
          minDistance={10}
          maxDistance={30}
        />
      </Canvas>

      {/* Center HTML Overlay */}
      {!isOpen && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          background: 'rgba(15, 23, 42, 0.75)',
          padding: '3rem',
          borderRadius: '20px',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          pointerEvents: 'auto',
          zIndex: 10,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            Welcome to Future Smart Campus
          </h1>
          <button 
            onClick={handleEnterClick}
            style={{
              padding: '1rem 3rem',
              fontSize: '1.25rem',
              fontWeight: '600',
              cursor: 'pointer',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseOver={(e) => e.target.style.background = '#2563eb'}
            onMouseOut={(e) => e.target.style.background = '#3b82f6'}
          >
            Enter Campus
          </button>
        </div>
      )}
    </div>
  );
};

export default EntryScene;
