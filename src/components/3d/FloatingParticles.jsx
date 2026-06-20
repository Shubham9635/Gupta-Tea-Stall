import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 50;

export default function FloatingParticles() {
  const pointsRef = useRef();
  const [particleCount, setParticleCount] = useState(MAX_PARTICLES);

  // Responsive mobile particle reduction
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        setParticleCount(15);
      } else if (window.innerWidth < 1024) {
        setParticleCount(30);
      } else {
        setParticleCount(MAX_PARTICLES);
      }
    }
  }, []);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const speeds = [];

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const i3 = i * 3;
      // Spread particles in a 3D box surrounding the cup
      positions[i3] = (Math.random() - 0.5) * 4.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 3.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 4.5;

      speeds.push({
        x: (Math.random() - 0.5) * 0.003,
        y: 0.003 + Math.random() * 0.005,
        z: (Math.random() - 0.5) * 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }

    return { positions, speeds };
  }, []);

  // Multi-layered radial glowing amber spark texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0.0, 'rgba(255, 235, 180, 1.0)'); // Hot bright core
    gradient.addColorStop(0.2, 'rgba(255, 184, 77, 0.95)');  // Warm amber body
    gradient.addColorStop(0.5, 'rgba(212, 160, 86, 0.35)');  // Soft ambient halo
    gradient.addColorStop(1.0, 'rgba(212, 160, 86, 0.0)');   // Transparent edge
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const i3 = i * 3;
      // Drift organically in all directions
      posArray[i3] += Math.sin(time * 0.35 + speeds[i].phase) * 0.002;
      posArray[i3 + 1] += speeds[i].y;
      posArray[i3 + 2] += Math.cos(time * 0.25 + speeds[i].phase) * 0.0015;

      // Wrap particles around bounds when they float too high or too wide
      if (posArray[i3 + 1] > 2.0) {
        posArray[i3 + 1] = -2.0;
        posArray[i3] = (Math.random() - 0.5) * 4.5;
        posArray[i3 + 2] = (Math.random() - 0.5) * 4.5;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.geometry.setDrawRange(0, particleCount);
    }
  }, [particleCount]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={MAX_PARTICLES}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={particleTexture}
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
