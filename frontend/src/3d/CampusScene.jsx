import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars, Float, Text, ContactShadows, useProgress } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// --- Loading Component ---
const CustomLoader = ({ onLoaded }) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onLoaded, 500);
    }
  }, [progress, onLoaded]);

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: '#0B0F1A', zIndex: 50, color: 'white'
    }}>
      <div style={{ width: '200px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#B388FF', transition: 'width 0.3s ease' }} />
      </div>
      <p style={{ marginTop: '1rem', letterSpacing: '2px', fontSize: '0.8rem', color: '#B388FF' }}>SYNCING CAMPUS GRID {Math.round(progress)}%</p>
    </div>
  );
};

// --- Interactive Building Component ---
const Building = ({ position, color, label, route, size = [3, 6, 3] }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  // Animate on hover
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        hovered ? size[1] / 2 + 0.5 : size[1] / 2,
        0.1
      );
      // Pulse emissive material when hovered
      if (meshRef.current.material) {
        meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
          meshRef.current.material.emissiveIntensity,
          hovered ? 0.8 : 0.2,
          0.1
        );
      }
    }
  });

  return (
    <group
      position={[position[0], 0, position[2]]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={() => navigate(route)}
    >
      <mesh ref={meshRef} position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#0B0F1A"
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
        {/* Wireframe edges for tech look */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
          <lineBasicMaterial color={color} transparent opacity={hovered ? 1 : 0.3} />
        </lineSegments>
      </mesh>

      {/* Floating Label */}
      <Text
        position={[0, size[1] + 1.5, 0]}
        fontSize={0.6}
        color={hovered ? '#FFF' : '#B0BCCB'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000"
      >
        {label}
      </Text>

      {/* Base Ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size[0] * 0.8, size[0] * 0.85, 32]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// --- Drone Component ---
const Drone = () => {
  const droneRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    droneRef.current.position.x = Math.sin(t * 0.5) * 15;
    droneRef.current.position.z = Math.cos(t * 0.3) * 15;
    droneRef.current.position.y = 8 + Math.sin(t * 2) * 0.5;
    droneRef.current.rotation.y = -Math.atan2(Math.cos(t * 0.3), Math.sin(t * 0.5));
  });

  return (
    <group ref={droneRef}>
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#4DA6FF" emissive="#4DA6FF" emissiveIntensity={0.5} />
      </mesh>
      <pointLight color="#4DA6FF" intensity={2} distance={10} />
    </group>
  );
};

// --- Main Scene ---
const CampusScene = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#02040a', position: 'relative' }}>
      {!isLoaded && <CustomLoader onLoaded={() => setIsLoaded(true)} />}

      <Canvas shadows camera={{ position: [20, 15, 20], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[20, 20, 25]} fov={45} />
        <OrbitControls
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
        />

        <color attach="background" args={['#02040a']} />
        <fog attach="fog" args={['#02040a', 15, 60]} />
        <Environment preset="night" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <ambientLight intensity={0.3} />
        <spotLight position={[20, 30, 20]} angle={0.3} penumbra={1} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />

        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            {/* Core Buildings */}
            <Building position={[0, 0, 0]} color="#FFD700" label="MAIN CORE" route="/about" size={[6, 12, 6]} />
            <Building position={[-10, 0, -5]} color="#4DA6FF" label="LIBRARY" route="/gallery" size={[4, 8, 6]} />
            <Building position={[10, 0, -5]} color="#B388FF" label="LABORATORY" route="/gallery" size={[5, 7, 5]} />
            <Building position={[-5, 0, 10]} color="#00E676" label="SPORTS ARENA" route="/gallery" size={[8, 4, 8]} />
            <Building position={[8, 0, 8]} color="#FF5252" label="ADMISSIONS" route="/admission" size={[4, 6, 4]} />
          </group>

          <Drone />

          {/* Cyberpunk Ground Grid */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[150, 150]} />
            <meshStandardMaterial color="#050811" roughness={0.8} />
          </mesh>
          <gridHelper args={[150, 75, "#1a2a44", "#0a1128"]} position={[0, 0.02, 0]} />

          <ContactShadows opacity={0.5} scale={40} blur={2.5} far={10} resolution={512} color="#000000" />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <AnimatePresence>
        {isLoaded && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              style={{ position: 'absolute', top: '100px', left: '40px', pointerEvents: 'none', zIndex: 10 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--primary-color)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>A</div>
                <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', letterSpacing: '2px' }}>CAMPUS MAP</h2>
              </div>
              <p style={{ color: '#B0BCCB', fontSize: '1rem', maxWidth: '300px', lineHeight: 1.6, background: 'rgba(11,15,26,0.5)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                Drag to rotate. Scroll to zoom. Click on any glowing structure to enter that sector of the academy.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              onClick={() => navigate('/home')}
              className="btn-glass"
              style={{ position: 'absolute', bottom: '40px', right: '40px', zIndex: 10, backdropFilter: 'blur(10px)', padding: '0.8rem 2rem' }}
            >
              Exit Map
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampusScene;
