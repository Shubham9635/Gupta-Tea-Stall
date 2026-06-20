import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import KulhadModel from './KulhadModel';
import SteamEffect from './SteamEffect';
import FloatingParticles from './FloatingParticles';

const lerp = (a, b, t) => a + (b - a) * t;

// Controller for camera floating (hover) and mouse parallax
function CameraController({ mouse }) {
  useFrame((state) => {
    const { camera } = state;
    const time = state.clock.getElapsedTime();
    
    // Smooth camera floating (slight slow sinusoidal drift)
    const floatY = 0.5 + Math.sin(time * 0.5) * 0.08;
    const floatX = Math.cos(time * 0.35) * 0.12;
    
    // Smooth mouse parallax (inverse Y for natural camera look)
    const targetX = floatX + mouse.x * 0.45;
    const targetY = floatY - mouse.y * 0.35;
    
    camera.position.x = lerp(camera.position.x, targetX, 0.045);
    camera.position.y = lerp(camera.position.y, targetY, 0.045);
    
    // Focus view near the top rim/center of the Kulhad cup
    camera.lookAt(0, 0.3, 0);
  });
  return null;
}

export default function Scene({ mouse, className = '', scale = 1, position = [0, 0, 0] }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 3.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CameraController mouse={mouse} />
          
          {/* Ambient lighting - soft warm base */}
          <ambientLight intensity={0.45} color="#ffe0b2" />
          
          {/* Warm spotlight from front-right with soft shadow map */}
          <spotLight
            position={[2.5, 4.5, 3.5]}
            angle={0.4}
            penumbra={1}
            intensity={6}
            color="#FFD1A9"
            castShadow
            shadow-bias={-0.0001}
          />
          
          {/* Intense soft orange rim light from behind */}
          <pointLight
            position={[-2.5, 2.0, -2.5]}
            intensity={5.0}
            color="#FF5500"
            distance={8}
            castShadow
          />
          
          {/* Bottom fill bounce light */}
          <pointLight
            position={[0, -2.0, 1.0]}
            intensity={1.0}
            color="#D4A056"
            distance={5}
          />

          <group scale={scale} position={position}>
            <KulhadModel mouse={mouse} />
            <SteamEffect mouse={mouse} />
            <FloatingParticles />
          </group>

          {/* Sunset Environment for beautiful metallic & glossy tea reflections */}
          <Environment preset="sunset" environmentIntensity={0.65} />
        </Suspense>
      </Canvas>
    </div>
  );
}
