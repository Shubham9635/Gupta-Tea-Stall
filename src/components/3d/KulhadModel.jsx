import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function KulhadModel({ mouse }) {
  const groupRef = useRef();
  const teaRef = useRef();

  // Create highly realistic irregular clay geometry matching the reference image
  const kulhadGeometry = useMemo(() => {
    const points = [];
    // Bottom base (flat)
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.31, 0));
    points.push(new THREE.Vector2(0.33, 0.02));
    // Main lower body tapering up (vertical fluted section)
    points.push(new THREE.Vector2(0.35, 0.06));
    points.push(new THREE.Vector2(0.40, 0.15));
    points.push(new THREE.Vector2(0.44, 0.3));
    points.push(new THREE.Vector2(0.48, 0.5));
    points.push(new THREE.Vector2(0.51, 0.7));
    // Raised decorative band
    points.push(new THREE.Vector2(0.52, 0.74));
    points.push(new THREE.Vector2(0.54, 0.76));
    points.push(new THREE.Vector2(0.54, 0.84));
    points.push(new THREE.Vector2(0.52, 0.86));
    // Outward flare at rim
    points.push(new THREE.Vector2(0.55, 0.90));
    points.push(new THREE.Vector2(0.59, 0.96));
    // Rim lip (rounded top)
    points.push(new THREE.Vector2(0.60, 0.98));
    points.push(new THREE.Vector2(0.59, 1.01));
    points.push(new THREE.Vector2(0.55, 1.02));
    points.push(new THREE.Vector2(0.52, 1.01));
    // Inner wall (creates thickness)
    points.push(new THREE.Vector2(0.49, 0.96));
    points.push(new THREE.Vector2(0.47, 0.88));
    points.push(new THREE.Vector2(0.45, 0.75));
    points.push(new THREE.Vector2(0.43, 0.6));
    points.push(new THREE.Vector2(0.41, 0.45));
    points.push(new THREE.Vector2(0.38, 0.3));
    points.push(new THREE.Vector2(0.33, 0.15));
    points.push(new THREE.Vector2(0.26, 0.06));
    points.push(new THREE.Vector2(0, 0.06));

    const geometry = new THREE.LatheGeometry(points, 128);
    
    // Apply radial vertical flutes & handcrafted displacement
    const positionAttr = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positionAttr.count; i++) {
      vertex.fromBufferAttribute(positionAttr, i);
      
      const radius = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
      
      // Determine if vertex is on the outer wall of the fluted region (y: 0.06 to 0.73)
      if (vertex.y >= 0.05 && vertex.y <= 0.73 && radius > (0.31 + vertex.y * 0.25)) {
        const angle = Math.atan2(vertex.z, vertex.x);
        
        // Envelope factor to smoothly blend flutes out at boundaries
        const factor = Math.min(1.0, (vertex.y - 0.05) / 0.08) * Math.min(1.0, (0.73 - vertex.y) / 0.06);
        
        // Define vertical fluting matching image (about 42 vertical ridges)
        // Using pow(0.7) to flatten the peaks and make the grooves sharper
        let fluteVal = Math.sin(angle * 42.0);
        const fluteDisp = Math.sign(fluteVal) * Math.pow(Math.abs(fluteVal), 0.75) * 0.016 * factor;
        
        vertex.x += Math.cos(angle) * fluteDisp;
        vertex.z += Math.sin(angle) * fluteDisp;
      }
      
      // Apply minor handcrafted organic noise to overall outer body (uneven rim & lip)
      if (vertex.y > 0.02 && radius > 0.08) {
        const angle = Math.atan2(vertex.z, vertex.x);
        let organicDisp = Math.sin(angle * 3.0) * 0.005 + Math.cos(angle * 5.0) * 0.003;
        
        // Slight organic tilt/bump on upper parts
        if (vertex.y > 0.85) {
          organicDisp += Math.sin(angle * 4.0) * 0.006;
          vertex.y += Math.sin(angle * 5.0) * 0.006 + Math.cos(angle * 8.0) * 0.003;
        }
        
        vertex.x += Math.cos(angle) * organicDisp;
        vertex.z += Math.sin(angle) * organicDisp;
      }
      
      positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Tea liquid surface
  const teaGeometry = useMemo(() => {
    return new THREE.CircleGeometry(0.47, 64);
  }, []);

  // Generate clay textures matching the light terracotta color from the image
  const clayTextures = useMemo(() => {
    // 1. Base Color Canvas
    const colorCanvas = document.createElement('canvas');
    colorCanvas.width = 512;
    colorCanvas.height = 512;
    const cCtx = colorCanvas.getContext('2d');
    
    // Fill base peachy terracotta clay
    cCtx.fillStyle = '#D48855';
    cCtx.fillRect(0, 0, 512, 512);
    
    const colorGrad = cCtx.createLinearGradient(0, 0, 0, 512);
    colorGrad.addColorStop(0, '#B06536');   // Bottom edge
    colorGrad.addColorStop(0.1, '#C87B4B');  // Base transition
    colorGrad.addColorStop(0.4, '#D68958');  // Main vertical ridges
    colorGrad.addColorStop(0.72, '#DE9362'); // Just below decorative band
    colorGrad.addColorStop(0.8, '#C4743C');  // Decorative band highlight
    colorGrad.addColorStop(0.9, '#C07038');  // Flare neck
    colorGrad.addColorStop(1.0, '#CF824E');  // Rounded top rim
    cCtx.fillStyle = colorGrad;
    cCtx.fillRect(0, 0, 512, 512);
    
    // Draw decorative band leaf/arch carvings (maps to height Y: 370 to 430)
    cCtx.fillStyle = '#C4743C';
    cCtx.fillRect(0, 370, 512, 60);
    
    // Arch borders
    cCtx.fillStyle = 'rgba(75, 32, 10, 0.35)';
    cCtx.fillRect(0, 370, 512, 3); // Bottom horizontal groove
    cCtx.fillRect(0, 427, 512, 3); // Top horizontal groove
    
    // Bevel highlights
    cCtx.fillStyle = 'rgba(255, 210, 160, 0.25)';
    cCtx.fillRect(0, 373, 512, 2);
    cCtx.fillRect(0, 430, 512, 2);
    
    // Repeating arch path
    cCtx.strokeStyle = 'rgba(85, 38, 12, 0.45)';
    cCtx.lineWidth = 3.2;
    const repetitions = 28;
    const itemWidth = 512 / repetitions;
    for (let i = 0; i < repetitions; i++) {
      const xStart = i * itemWidth;
      const xMid = xStart + itemWidth / 2;
      const xEnd = xStart + itemWidth;
      
      // Curved leaf/arch outline
      cCtx.beginPath();
      cCtx.moveTo(xStart, 378);
      cCtx.quadraticCurveTo(xMid, 423, xEnd, 378);
      cCtx.stroke();
      
      // Vertical carve line in center
      cCtx.beginPath();
      cCtx.moveTo(xMid, 378);
      cCtx.lineTo(xMid, 408);
      cCtx.stroke();
      
      // Gradient shadow inside carve
      const shadowGrad = cCtx.createLinearGradient(0, 378, 0, 418);
      shadowGrad.addColorStop(0, 'rgba(80, 35, 12, 0.0)');
      shadowGrad.addColorStop(1, 'rgba(80, 35, 12, 0.22)');
      cCtx.fillStyle = shadowGrad;
      cCtx.beginPath();
      cCtx.moveTo(xStart, 378);
      cCtx.quadraticCurveTo(xMid, 423, xEnd, 378);
      cCtx.closePath();
      cCtx.fill();
    }
    
    // Fine soil/clay grain noise
    const imgData = cCtx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 14;
      
      // Small silica/sand specs
      let sand = 0;
      if (Math.random() > 0.99) {
        sand = (Math.random() - 0.25) * 32;
      }
      
      data[i] = Math.min(255, Math.max(0, data[i] + noise + sand));
      data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise * 0.95 + sand * 0.9));
      data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise * 0.85 + sand * 0.7));
    }
    cCtx.putImageData(imgData, 0, 0);
    
    // 2. Bump Map Canvas
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 512;
    bumpCanvas.height = 512;
    const bCtx = bumpCanvas.getContext('2d');
    
    // Neutral grey bump base
    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, 512, 512);
    
    // Draw decorative carvings on bump map
    bCtx.fillStyle = '#909090'; // Raised band base
    bCtx.fillRect(0, 370, 512, 60);
    
    // Grooves are darker indents
    bCtx.fillStyle = '#505050';
    bCtx.fillRect(0, 370, 512, 3);
    bCtx.fillRect(0, 427, 512, 3);
    
    // Bevel borders
    bCtx.fillStyle = '#b0b0b0';
    bCtx.fillRect(0, 373, 512, 2);
    bCtx.fillRect(0, 430, 512, 2);
    
    bCtx.strokeStyle = '#484848';
    bCtx.lineWidth = 3.2;
    for (let i = 0; i < repetitions; i++) {
      const xStart = i * itemWidth;
      const xMid = xStart + itemWidth / 2;
      const xEnd = xStart + itemWidth;
      
      bCtx.beginPath();
      bCtx.moveTo(xStart, 378);
      bCtx.quadraticCurveTo(xMid, 423, xEnd, 378);
      bCtx.stroke();
      
      bCtx.beginPath();
      bCtx.moveTo(xMid, 378);
      bCtx.lineTo(xMid, 408);
      bCtx.stroke();
      
      // Bevel gradient inside carved triangles
      const bGrad = bCtx.createLinearGradient(0, 378, 0, 418);
      bGrad.addColorStop(0, 'rgba(128, 128, 128, 0)');
      bGrad.addColorStop(1, 'rgba(64, 64, 64, 0.35)');
      bCtx.fillStyle = bGrad;
      bCtx.beginPath();
      bCtx.moveTo(xStart, 378);
      bCtx.quadraticCurveTo(xMid, 423, xEnd, 378);
      bCtx.closePath();
      bCtx.fill();
    }
    
    // High frequency sand bumpiness
    const bImgData = bCtx.getImageData(0, 0, 512, 512);
    const bData = bImgData.data;
    for (let i = 0; i < bData.length; i += 4) {
      const grain = (Math.random() - 0.5) * 12;
      bData[i] = Math.min(255, Math.max(0, bData[i] + grain));
      bData[i+1] = Math.min(255, Math.max(0, bData[i+1] + grain));
      bData[i+2] = Math.min(255, Math.max(0, bData[i+2] + grain));
    }
    bCtx.putImageData(bImgData, 0, 0);
    
    // 3. Roughness Map Canvas
    const roughCanvas = document.createElement('canvas');
    roughCanvas.width = 512;
    roughCanvas.height = 512;
    const rCtx = roughCanvas.getContext('2d');
    
    // Matte clay roughness
    rCtx.fillStyle = '#ebebeb'; // ~92% roughness
    rCtx.fillRect(0, 0, 512, 512);
    
    const colorTex = new THREE.CanvasTexture(colorCanvas);
    const bumpTex = new THREE.CanvasTexture(bumpCanvas);
    const roughTex = new THREE.CanvasTexture(roughCanvas);
    
    colorTex.wrapS = THREE.RepeatWrapping;
    colorTex.wrapT = THREE.RepeatWrapping;
    bumpTex.wrapS = THREE.RepeatWrapping;
    bumpTex.wrapT = THREE.RepeatWrapping;
    roughTex.wrapS = THREE.RepeatWrapping;
    roughTex.wrapT = THREE.RepeatWrapping;
    
    return { colorTex, bumpTex, roughTex };
  }, []);

  // Generate appetizing milky peach-orange tea texture matching the image
  const teaTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#5B2E0B';
    ctx.fillRect(0, 0, 512, 512);
    
    // Radial gradient matching tea in the reference image
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, '#EAA86E');     // Milky orange-peach tea center
    grad.addColorStop(0.4, '#D99354');   // Milky caramel tea body
    grad.addColorStop(0.75, '#B26727');  // Deep tea color
    grad.addColorStop(0.92, '#7A3F10');  // Dark shadow near clay edge
    grad.addColorStop(1.0, '#4A2304');   // Crease shadows
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    
    // Thick ring of frothy cream bubbles along outer edge (exactly as shown in image)
    for (let angle = 0; angle < Math.PI * 2; angle += 0.012) {
      const bubbleCount = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < bubbleCount; j++) {
        const radius = 208 + Math.sin(angle * 6) * 5 + Math.random() * 30;
        const x = 256 + Math.cos(angle) * radius;
        const y = 256 + Math.sin(angle) * radius;
        
        const size = 1.0 + Math.random() * 5.0;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.3 ? 'rgba(253, 245, 230, 0.95)' : 'rgba(240, 218, 175, 0.9)';
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(95, 45, 12, 0.25)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
    
    // Tiny scattered bubbles in the center
    for (let i = 0; i < 40; i++) {
      const radius = Math.sqrt(Math.random()) * 160;
      const angle = Math.random() * Math.PI * 2;
      const x = 256 + Math.cos(angle) * radius;
      const y = 256 + Math.sin(angle) * radius;
      
      const size = 0.6 + Math.random() * 2.0;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 248, 220, 0.75)';
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(100, 50, 10, 0.18)';
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  const clayMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: clayTextures.colorTex,
      bumpMap: clayTextures.bumpTex,
      bumpScale: 0.012,
      roughnessMap: clayTextures.roughTex,
      roughness: 0.95,
      metalness: 0.04,
      envMapIntensity: 0.8,
    });
  }, [clayTextures]);

  const teaMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: teaTexture,
      roughness: 0.06,
      metalness: 0.05,
      transparent: true,
      opacity: 0.98,
      envMapIntensity: 1.2,
    });
  }, [teaTexture]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth slow rotation
      groupRef.current.rotation.y += 0.0015;
      
      // Mouse-reactive tilt
      const targetRotX = (mouse.y * 0.12);
      const targetRotZ = (mouse.x * -0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotZ,
        0.05
      );

      // Subtle float animation
      groupRef.current.position.y = -0.45 + Math.sin(state.clock.elapsedTime * 0.7) * 0.025;
    }

    // Tea surface wave
    if (teaRef.current) {
      teaRef.current.position.y = 0.932 + Math.sin(state.clock.elapsedTime * 1.4) * 0.0025;
    }
  });

  return (
    <group ref={groupRef} scale={1.35} position={[0, -0.45, 0]}>
      {/* Kulhad body */}
      <mesh geometry={kulhadGeometry} material={clayMaterial} castShadow receiveShadow />
      
      {/* Tea liquid */}
      <mesh
        ref={teaRef}
        geometry={teaGeometry}
        material={teaMaterial}
        position={[0, 0.932, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      />
      
      {/* Inner shadow ring */}
      <mesh position={[0, 0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.43, 0.48, 64]} />
        <meshStandardMaterial
          color="#3c1e0a"
          roughness={0.95}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
