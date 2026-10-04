import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface KineticRobotCanvasProps {
  scrollProgress: number;
  scrollVelocity: number;
  mousePos: { x: number; y: number };
}

export const KineticRobotCanvas: React.FC<KineticRobotCanvasProps> = ({
  scrollProgress,
  scrollVelocity,
  mousePos,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    scrollProgress: 0,
    scrollVelocity: 0,
    mousePos: { x: 0.5, y: 0.5 },
  });

  // Keep state updated in refs for continuous 60fps render loop
  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
    stateRef.current.scrollVelocity = scrollVelocity;
    stateRef.current.mousePos = mousePos;
  }, [scrollProgress, scrollVelocity, mousePos]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030303, 0.07);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 5.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // MATERIALS - Sophisticated Black Chrome + Brushed Metallic Silver
    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0c,
      metalness: 0.94,
      roughness: 0.18,
    });

    const brushedSilverMat = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      metalness: 0.92,
      roughness: 0.24,
    });

    const brightChromeMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      metalness: 0.98,
      roughness: 0.12,
    });

    const graphiteMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      metalness: 0.85,
      roughness: 0.35,
    });

    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // -------------------------------------------------------------
    // ROBOT HIERARCHY
    // -------------------------------------------------------------
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    const upperBodyGroup = new THREE.Group();
    robotRoot.add(upperBodyGroup);

    // Torso Frame & Spine
    const spineGroup = new THREE.Group();
    upperBodyGroup.add(spineGroup);

    for (let i = 0; i < 5; i++) {
      const vertGeo = new THREE.CylinderGeometry(0.18 - i * 0.015, 0.19 - i * 0.015, 0.08, 16);
      const vert = new THREE.Mesh(vertGeo, graphiteMat);
      vert.position.y = -0.3 - i * 0.12;
      spineGroup.add(vert);

      // Vertebra connector rings
      const discGeo = new THREE.TorusGeometry(0.19 - i * 0.015, 0.02, 8, 24);
      const disc = new THREE.Mesh(discGeo, brushedSilverMat);
      disc.rotation.x = Math.PI / 2;
      disc.position.y = -0.3 - i * 0.12;
      spineGroup.add(disc);
    }

    // Chest / Rib Assembly
    const chestGroup = new THREE.Group();
    upperBodyGroup.add(chestGroup);

    // Left & Right Pectoral Shells (Brushed Silver)
    const chestShellGeo = new THREE.BoxGeometry(0.48, 0.42, 0.36);
    const leftPec = new THREE.Mesh(chestShellGeo, brushedSilverMat);
    leftPec.position.set(-0.3, 0.05, 0.12);
    leftPec.rotation.set(0.05, 0.12, -0.05);
    chestGroup.add(leftPec);

    const rightPec = new THREE.Mesh(chestShellGeo, brushedSilverMat);
    rightPec.position.set(0.3, 0.05, 0.12);
    rightPec.rotation.set(0.05, -0.12, 0.05);
    chestGroup.add(rightPec);

    // Central Sternum & AI Reactor Core
    const sternumGeo = new THREE.BoxGeometry(0.16, 0.54, 0.38);
    const sternum = new THREE.Mesh(sternumGeo, darkChromeMat);
    sternum.position.set(0, 0.02, 0.14);
    chestGroup.add(sternum);

    // Core Reactor Ring & Emitter
    const coreRingGeo = new THREE.TorusGeometry(0.12, 0.022, 12, 32);
    const coreRing = new THREE.Mesh(coreRingGeo, brightChromeMat);
    coreRing.position.set(0, 0.08, 0.34);
    chestGroup.add(coreRing);

    const coreEmitterGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 24);
    const coreEmitter = new THREE.Mesh(coreEmitterGeo, coreGlowMat);
    coreEmitter.rotation.x = Math.PI / 2;
    coreEmitter.position.set(0, 0.08, 0.34);
    chestGroup.add(coreEmitter);

    const coreLight = new THREE.PointLight(0xffffff, 1.2, 2.5);
    coreLight.position.set(0, 0.08, 0.4);
    chestGroup.add(coreLight);

    // Collar Plates
    const collarGeo = new THREE.BoxGeometry(0.85, 0.08, 0.3);
    const collar = new THREE.Mesh(collarGeo, darkChromeMat);
    collar.position.set(0, 0.32, 0.08);
    upperBodyGroup.add(collar);

    // Shoulders
    const leftShoulderGroup = new THREE.Group();
    leftShoulderGroup.position.set(-0.76, 0.22, 0.02);
    upperBodyGroup.add(leftShoulderGroup);

    const rightShoulderGroup = new THREE.Group();
    rightShoulderGroup.position.set(0.76, 0.22, 0.02);
    upperBodyGroup.add(rightShoulderGroup);

    const shoulderSphereGeo = new THREE.SphereGeometry(0.24, 24, 24);
    const leftShoulderBall = new THREE.Mesh(shoulderSphereGeo, darkChromeMat);
    leftShoulderGroup.add(leftShoulderBall);
    const rightShoulderBall = new THREE.Mesh(shoulderSphereGeo, darkChromeMat);
    rightShoulderGroup.add(rightShoulderBall);

    const shoulderArmorGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.22, 24, 1, false, 0, Math.PI * 1.3);
    const leftArmor = new THREE.Mesh(shoulderArmorGeo, brushedSilverMat);
    leftArmor.rotation.z = Math.PI / 2;
    leftArmor.rotation.y = 0.3;
    leftShoulderGroup.add(leftArmor);

    const rightArmor = new THREE.Mesh(shoulderArmorGeo, brushedSilverMat);
    rightArmor.rotation.z = -Math.PI / 2;
    rightArmor.rotation.y = -0.3;
    rightShoulderGroup.add(rightArmor);

    // Upper Arm Shafts
    const armGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.65, 18);
    const leftArm = new THREE.Mesh(armGeo, darkChromeMat);
    leftArm.position.set(0, -0.42, 0);
    leftArm.rotation.z = 0.08;
    leftShoulderGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, darkChromeMat);
    rightArm.position.set(0, -0.42, 0);
    rightArm.rotation.z = -0.08;
    rightShoulderGroup.add(rightArm);

    // NECK & HEAD GROUP
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, 0.36, 0.02);
    upperBodyGroup.add(neckGroup);

    // Cervical vertebrae & pistons
    const neckBaseGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.22, 16);
    const neckBase = new THREE.Mesh(neckBaseGeo, graphiteMat);
    neckBase.position.y = 0.08;
    neckGroup.add(neckBase);

    // Hydraulic neck struts
    const pistonGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.2, 12);
    const leftPiston = new THREE.Mesh(pistonGeo, brightChromeMat);
    leftPiston.position.set(-0.1, 0.08, -0.04);
    neckGroup.add(leftPiston);

    const rightPiston = new THREE.Mesh(pistonGeo, brightChromeMat);
    rightPiston.position.set(0.1, 0.08, -0.04);
    neckGroup.add(rightPiston);

    // HEAD
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.24, 0.02);
    neckGroup.add(headGroup);

    // Cranial Shell (Brushed Silver Aerodynamic Shape)
    const craniumGeo = new THREE.SphereGeometry(0.34, 32, 24);
    craniumGeo.scale(0.85, 1.1, 1.05);
    const cranium = new THREE.Mesh(craniumGeo, brushedSilverMat);
    cranium.position.set(0, 0.12, -0.02);
    headGroup.add(cranium);

    // Face Visor Assembly (Dark High-Gloss Titanium)
    const visorGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.36, 24, 1, false, -Math.PI * 0.45, Math.PI * 0.9);
    const visor = new THREE.Mesh(visorGeo, darkChromeMat);
    visor.position.set(0, 0.08, 0.15);
    visor.rotation.y = Math.PI;
    headGroup.add(visor);

    // Ocular Optical Sensor (Slit with soft silver glow)
    const eyeSlitGeo = new THREE.BoxGeometry(0.26, 0.026, 0.06);
    const eyeSlit = new THREE.Mesh(eyeSlitGeo, coreGlowMat);
    eyeSlit.position.set(0, 0.11, 0.3);
    headGroup.add(eyeSlit);

    const eyeLight = new THREE.PointLight(0xffffff, 0.9, 1.5);
    eyeLight.position.set(0, 0.11, 0.35);
    headGroup.add(eyeLight);

    // Jaw & Chin Mechanism
    const jawGeo = new THREE.BoxGeometry(0.28, 0.18, 0.26);
    const jaw = new THREE.Mesh(jawGeo, darkChromeMat);
    jaw.position.set(0, -0.12, 0.12);
    headGroup.add(jaw);

    const chinGeo = new THREE.BoxGeometry(0.14, 0.08, 0.12);
    const chin = new THREE.Mesh(chinGeo, brushedSilverMat);
    chin.position.set(0, -0.21, 0.16);
    headGroup.add(chin);

    // Temporal Sensor Plates (Ears)
    const earGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 20);
    const leftEar = new THREE.Mesh(earGeo, brightChromeMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-0.31, 0.08, 0.02);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, brightChromeMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(0.31, 0.08, 0.02);
    headGroup.add(rightEar);

    // -------------------------------------------------------------
    // KINETIC ORBITAL LIGHT TRAILS (Thin silver energy paths)
    // -------------------------------------------------------------
    const ringsGroup = new THREE.Group();
    robotRoot.add(ringsGroup);

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.38,
      wireframe: true,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xc7c7c7,
      transparent: true,
      opacity: 0.28,
      wireframe: true,
    });
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x909090,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.008, 6, 80), ringMat1);
    ring1.rotation.x = Math.PI * 0.38;
    ring1.rotation.y = Math.PI * 0.12;
    ringsGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.007, 6, 80), ringMat2);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.z = Math.PI * 0.22;
    ringsGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.006, 6, 80), ringMat3);
    ring3.rotation.y = Math.PI * 0.45;
    ring3.rotation.x = Math.PI * 0.15;
    ringsGroup.add(ring3);

    // Micro orbital satellites on rings
    const satGeo = new THREE.SphereGeometry(0.028, 8, 8);
    const sat1 = new THREE.Mesh(satGeo, coreGlowMat);
    ring1.add(sat1);
    sat1.position.x = 1.65;

    const sat2 = new THREE.Mesh(satGeo, coreGlowMat);
    ring2.add(sat2);
    sat2.position.x = 1.95;

    // -------------------------------------------------------------
    // METALLIC MICRO-PARTICLE FIELD (1,000 particles)
    // -------------------------------------------------------------
    const particleCount = prefersReducedMotion ? 150 : (window.innerWidth < 768 ? 400 : 900);
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginals[i * 3] = x;
      particleOriginals[i * 3 + 1] = y;
      particleOriginals[i * 3 + 2] = z;

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.008;
      particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd8d8d8,
      size: 0.032,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    robotRoot.add(particleSystem);

    // -------------------------------------------------------------
    // LIGHTING SYSTEM
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x222222, 1.4);
    scene.add(ambientLight);

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    // Sharp Rear Rim Light 1 (Creates iconic silver edge highlight)
    const rimLight1 = new THREE.DirectionalLight(0xffffff, 4.2);
    rimLight1.position.set(-4, 3, -3);
    scene.add(rimLight1);

    // Sharp Rear Rim Light 2
    const rimLight2 = new THREE.DirectionalLight(0xc0c0c0, 3.2);
    rimLight2.position.set(4, -2, -2.5);
    scene.add(rimLight2);

    // Bottom bounce
    const bounceLight = new THREE.DirectionalLight(0x404040, 0.8);
    bounceLight.position.set(0, -4, 2);
    scene.add(bounceLight);

    // -------------------------------------------------------------
    // RESPONSIVE RESIZE
    // -------------------------------------------------------------
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // ANIMATION & INTERACTION LOOP
    // -------------------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const { scrollProgress: sp, scrollVelocity: sv, mousePos: mp } = stateRef.current;

      const isMobile = window.innerWidth < 768;
      const aspect = window.innerWidth / (window.innerHeight || 1);
      const desktopTargetX = aspect > 1.7 ? 2.05 : aspect > 1.4 ? 1.75 : 1.35;

      // 1. POSITIONING ACROSS SCROLL
      // In Hero (sp = 0): robot is located comfortably on the right half
      // In Services (sp > 0.2): robot shifts center & rotates
      // In About (sp > 0.5): robot moves deeper and turns
      // After About (sp > 0.75): dissolves and transitions
      let targetX = isMobile ? 0 : desktopTargetX;
      let targetY = isMobile ? -0.4 : -0.05;
      let targetZ = isMobile ? -0.8 : (aspect > 1.7 ? 0.3 : 0);
      let targetRotY = -0.38;
      let targetRotX = 0.05;

      if (sp > 0.05 && sp <= 0.35) {
        // Shift towards center in transition
        const t = (sp - 0.05) / 0.3;
        targetX = THREE.MathUtils.lerp(isMobile ? 0 : desktopTargetX, isMobile ? 0 : 0.3, t);
        targetRotY = THREE.MathUtils.lerp(-0.38, 0.15, t);
        targetZ = THREE.MathUtils.lerp(0, 0.6, t);
      } else if (sp > 0.35 && sp <= 0.65) {
        // About section view (deep in darkness on right or subtle center)
        const t = (sp - 0.35) / 0.3;
        targetX = THREE.MathUtils.lerp(isMobile ? 0 : 0.3, isMobile ? 0 : -0.8, t);
        targetRotY = THREE.MathUtils.lerp(0.15, 0.45, t);
        targetZ = THREE.MathUtils.lerp(0.6, -0.4, t);
      } else if (sp > 0.65) {
        targetX = THREE.MathUtils.lerp(-0.8, 0, (sp - 0.65) / 0.35);
        targetZ = THREE.MathUtils.lerp(-0.4, -1.8, (sp - 0.65) / 0.35);
        targetRotY = THREE.MathUtils.lerp(0.45, 1.2, (sp - 0.65) / 0.35);
      }

      robotRoot.position.x = THREE.MathUtils.lerp(robotRoot.position.x, targetX, 0.05);
      robotRoot.position.y = THREE.MathUtils.lerp(robotRoot.position.y, targetY, 0.05);
      robotRoot.position.z = THREE.MathUtils.lerp(robotRoot.position.z, targetZ, 0.05);

      // 2. IDLE BREATHING & MICRO HEAD MOTIONS
      if (!prefersReducedMotion) {
        const breath = Math.sin(elapsed * 1.5) * 0.016;
        chestGroup.position.y = breath;
        collar.position.y = 0.32 + breath * 0.5;

        // Micro ocular pulsing
        const eyePulse = 0.85 + Math.sin(elapsed * 3.2) * 0.25;
        eyeLight.intensity = eyePulse;
        coreLight.intensity = 1.1 + Math.sin(elapsed * 2.1) * 0.3;

        // 3. MOUSE REACTIVITY (Head follows cursor smoothly)
        const mouseNormX = (mp.x - 0.5) * 2; // -1 to 1
        const mouseNormY = (mp.y - 0.5) * 2;

        const headTargetRotY = mouseNormX * 0.42;
        const headTargetRotX = -mouseNormY * 0.28;

        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, headTargetRotY, 0.06);
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, headTargetRotX, 0.06);

        // Upper body follows with smaller amplitude
        upperBodyGroup.rotation.y = THREE.MathUtils.lerp(
          upperBodyGroup.rotation.y,
          targetRotY + mouseNormX * 0.15,
          0.04
        );
        upperBodyGroup.rotation.x = THREE.MathUtils.lerp(
          upperBodyGroup.rotation.x,
          targetRotX - mouseNormY * 0.08,
          0.04
        );

        // Camera subtle parallax
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseNormX * 0.22, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2 - mouseNormY * 0.14, 0.04);
      }

      // 4. ORBITAL RINGS ROTATION & SCROLL VELOCITY ACCELERATION
      const velocityBoost = Math.min(Math.abs(sv) * 0.04, 0.12);
      ring1.rotation.z += 0.004 + velocityBoost;
      ring2.rotation.y += 0.003 + velocityBoost;
      ring3.rotation.x += 0.002 + velocityBoost;

      // 5. PARTICLE SYSTEM ANIMATION
      const positions = particleGeometry.attributes.position.array as Float32Array;
      const speedMult = prefersReducedMotion ? 0.2 : 1 + velocityBoost * 10;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += particleVelocities[i3] * speedMult;
        positions[i3 + 1] += particleVelocities[i3 + 1] * speedMult;
        positions[i3 + 2] += particleVelocities[i3 + 2] * speedMult;

        // Circular orbit drift
        const dx = positions[i3];
        const dz = positions[i3 + 2];
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist > 3.6 || dist < 0.8) {
          positions[i3] = particleOriginals[i3];
          positions[i3 + 1] = particleOriginals[i3 + 1];
          positions[i3 + 2] = particleOriginals[i3 + 2];
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Render scene
      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      darkChromeMat.dispose();
      brushedSilverMat.dispose();
      brightChromeMat.dispose();
      graphiteMat.dispose();
      coreGlowMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full overflow-hidden"
      aria-hidden="true"
    />
  );
};
