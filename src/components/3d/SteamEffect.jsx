import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 160;

export default function SteamEffect({ mouse }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const [particleCount, setParticleCount] = useState(MAX_PARTICLES);

  // Dynamic particle count based on screen width for mobile optimization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        setParticleCount(60); // Moderate count for mobile
      } else if (window.innerWidth < 1024) {
        setParticleCount(100); // Decent count for tablets
      } else {
        setParticleCount(MAX_PARTICLES);
      }
    }
  }, []);

  // Initialize particle properties
  const { positions, speeds, lifetimes, phases, randomScales } = useMemo(() => {
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const speeds = new Float32Array(MAX_PARTICLES);
    const lifetimes = new Float32Array(MAX_PARTICLES);
    const phases = new Float32Array(MAX_PARTICLES);
    const randomScales = new Float32Array(MAX_PARTICLES);

    for (let i = 0; i < MAX_PARTICLES; i++) {
      // Start in a tight central circle representing tea surface center (more realistic thermal rise)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.22;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0.94 + Math.random() * 0.15; // Tighter initial heights
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Realistic slow thermal rise
      speeds[i] = 0.2 + Math.random() * 0.35;
      lifetimes[i] = Math.random();
      phases[i] = Math.random() * Math.PI * 2;
      randomScales[i] = 0.5 + Math.random() * 0.7;
    }

    return { positions, speeds, lifetimes, phases, randomScales };
  }, []);

  // Ultra-soft, wispy gradient texture with no bright core to prevent a "bubble" appearance
  const steamTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 0.35)'); // Very soft center
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.20)');
    gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.08)');
    gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.01)');
    gradient.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  // Volumetric smoke shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float aSpeed;
        attribute float aPhase;
        attribute float aLifetime;
        attribute float aRandomScale;
        varying float vLifetime;

        void main() {
          vec3 pos = position;
          float progress = aLifetime;

          // Lift upwards - gentler and shorter travel for realistic tea steam
          pos.y += progress * 1.5;

          // Slow organic sway (wind currents)
          float swayX = sin(pos.y * 3.0 + uTime * 0.5 + aPhase) * 0.14 * (progress + 0.25);
          float swayZ = cos(pos.y * 2.4 + uTime * 0.4 + aPhase) * 0.10 * (progress + 0.25);
          pos.x += swayX;
          pos.z += swayZ;

          // Mouse reactivity - push steam slightly in mouse direction
          pos.x += uMouse.x * progress * 0.35;
          pos.z += uMouse.y * progress * 0.25;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

          // Particles expand/diffuse significantly as they float upwards to blend together
          float size = 52.0 * (1.0 + progress * 3.8) * aRandomScale;
          gl_PointSize = size * (3.0 / -mvPosition.z); // distance attenuation

          gl_Position = projectionMatrix * mvPosition;
          vLifetime = progress;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying float vLifetime;

        void main() {
          vec4 texColor = texture2D(uTexture, gl_PointCoord);

          // Fade-in at bottom near the tea
          float fadeIn = smoothstep(0.0, 0.15, vLifetime);
          // Fade-out towards the top
          float fadeOut = smoothstep(1.0, 0.4, vLifetime);

          // Transparent translucent blending for continuous vapor/steam wisps instead of circles
          float alpha = texColor.a * fadeIn * fadeOut * 0.12;

          // Warm milky chai steam color (soft ivory cream)
          vec3 steamColor = vec3(0.97, 0.95, 0.90);

          gl_FragColor = vec4(steamColor, alpha);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTexture: { value: steamTexture }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, [steamTexture]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const lifetimeAttr = geo.attributes.aLifetime;

    // Advance particle timelines slowly
    for (let i = 0; i < MAX_PARTICLES; i++) {
      lifetimes[i] += speeds[i] * 0.0028; // Toned down rising speed

      if (lifetimes[i] > 1.0) {
        lifetimes[i] = 0.0;
        // Reset starting position inside the tight center tea surface
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.22;
        posAttr.setX(i, Math.cos(angle) * radius);
        posAttr.setY(i, 0.94);
        posAttr.setZ(i, Math.sin(angle) * radius);
      }

      lifetimeAttr.setX(i, lifetimes[i]);
    }

    posAttr.needsUpdate = true;
    lifetimeAttr.needsUpdate = true;

    // Update shader uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      // Smoothly lerp mouse coordinate updates
      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        mouse.x,
        0.05
      );
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        mouse.y,
        0.05
      );
    }
  });

  // Keep draw range limited to screen optimization count
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
        <bufferAttribute
          attach="attributes-aSpeed"
          count={MAX_PARTICLES}
          array={speeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          count={MAX_PARTICLES}
          array={phases}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aLifetime"
          count={MAX_PARTICLES}
          array={lifetimes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandomScale"
          count={MAX_PARTICLES}
          array={randomScales}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive
        ref={materialRef}
        object={shaderMaterial}
        attach="material"
      />
    </points>
  );
}
