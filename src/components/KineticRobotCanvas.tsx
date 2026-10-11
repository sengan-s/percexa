import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motionState, isWebGLAvailable } from '../utils/motionState';

export const KineticRobotCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Graceful fallback if WebGL is unavailable
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = motionState.prefersReducedMotion;
    const isMobile = motionState.isMobile;
    const isLowEnd = motionState.isLowEnd;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030303, 0.08);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      60
    );
    camera.position.set(0, 0.2, 5.8);

    // Adaptive DPR: Max 1.25 for desktop, 1.0 for mobile/low-end
    const targetDPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : isLowEnd ? 1.0 : 1.25);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isLowEnd,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(targetDPR);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed, using fallback', e);
      setHasWebGL(false);
      return;
    }

    // Handle WebGL context lost gracefully
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost, pausing render.');
    };
    const handleContextRestored = () => {
      console.log('WebGL context restored.');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // MATERIALS - Sophisticated Black Chrome + Brushed Metallic Silver (Shared)
    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0c,
      metalness: 0.94,
      roughness: 0.2,
    });

    const brushedSilverMat = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      metalness: 0.92,
      roughness: 0.26,
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

    // ROBOT HIERARCHY
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    const upperBodyGroup = new THREE.Group();
    robotRoot.add(upperBodyGroup);

    // Torso Frame & Spine (Optimized segment count)
    const spineGroup = new THREE.Group();
    upperBodyGroup.add(spineGroup);

    const vertSegmentCount = isLowEnd ? 8 : 12;
    for (let i = 0; i < 5; i++) {
      const vertGeo = new THREE.CylinderGeometry(0.18 - i * 0.015, 0.19 - i * 0.015, 0.08, vertSegmentCount);
      const vert = new THREE.Mesh(vertGeo, graphiteMat);
      vert.position.y = -0.3 - i * 0.12;
      spineGroup.add(vert);

      const discGeo = new THREE.TorusGeometry(0.19 - i * 0.015, 0.02, 6, 16);
      const disc = new THREE.Mesh(discGeo, brushedSilverMat);
      disc.rotation.x = Math.PI / 2;
      disc.position.y = -0.3 - i * 0.12;
      spineGroup.add(disc);
    }

    // Chest / Rib Assembly
    const chestGroup = new THREE.Group();
    upperBodyGroup.add(chestGroup);

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

    const coreRingGeo = new THREE.TorusGeometry(0.12, 0.022, 8, 20);
    const coreRing = new THREE.Mesh(coreRingGeo, brightChromeMat);
    coreRing.position.set(0, 0.08, 0.34);
    chestGroup.add(coreRing);

    const coreEmitterGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
    const coreEmitter = new THREE.Mesh(coreEmitterGeo, coreGlowMat);
    coreEmitter.rotation.x = Math.PI / 2;
    coreEmitter.position.set(0, 0.08, 0.34);
    chestGroup.add(coreEmitter);

    const coreLight = new THREE.PointLight(0xffffff, 1.2, 2.5);
    coreLight.position.set(0, 0.08, 0.4);
    chestGroup.add(coreLight);

    // Collar
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

    const shoulderSphereGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const leftShoulderBall = new THREE.Mesh(shoulderSphereGeo, darkChromeMat);
    leftShoulderGroup.add(leftShoulderBall);
    const rightShoulderBall = new THREE.Mesh(shoulderSphereGeo, darkChromeMat);
    rightShoulderGroup.add(rightShoulderBall);

    const shoulderArmorGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.22, 16, 1, false, 0, Math.PI * 1.3);
    const leftArmor = new THREE.Mesh(shoulderArmorGeo, brushedSilverMat);
    leftArmor.rotation.z = Math.PI / 2;
    leftArmor.rotation.y = 0.3;
    leftShoulderGroup.add(leftArmor);

    const rightArmor = new THREE.Mesh(shoulderArmorGeo, brushedSilverMat);
    rightArmor.rotation.z = -Math.PI / 2;
    rightArmor.rotation.y = -0.3;
    rightShoulderGroup.add(rightArmor);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.65, 12);
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

    const neckBaseGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.22, 12);
    const neckBase = new THREE.Mesh(neckBaseGeo, graphiteMat);
    neckBase.position.y = 0.08;
    neckGroup.add(neckBase);

    // HEAD
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.24, 0.02);
    neckGroup.add(headGroup);

    const craniumGeo = new THREE.SphereGeometry(0.34, 20, 16);
    craniumGeo.scale(0.85, 1.1, 1.05);
    const cranium = new THREE.Mesh(craniumGeo, brushedSilverMat);
    cranium.position.set(0, 0.12, -0.02);
    headGroup.add(cranium);

    const visorGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.36, 18, 1, false, -Math.PI * 0.45, Math.PI * 0.9);
    const visor = new THREE.Mesh(visorGeo, darkChromeMat);
    visor.position.set(0, 0.08, 0.15);
    visor.rotation.y = Math.PI;
    headGroup.add(visor);

    const eyeSlitGeo = new THREE.BoxGeometry(0.26, 0.026, 0.06);
    const eyeSlit = new THREE.Mesh(eyeSlitGeo, coreGlowMat);
    eyeSlit.position.set(0, 0.11, 0.3);
    headGroup.add(eyeSlit);

    const eyeLight = new THREE.PointLight(0xffffff, 0.9, 1.5);
    eyeLight.position.set(0, 0.11, 0.35);
    headGroup.add(eyeLight);

    const jawGeo = new THREE.BoxGeometry(0.28, 0.18, 0.26);
    const jaw = new THREE.Mesh(jawGeo, darkChromeMat);
    jaw.position.set(0, -0.12, 0.12);
    headGroup.add(jaw);

    const chinGeo = new THREE.BoxGeometry(0.14, 0.08, 0.12);
    const chin = new THREE.Mesh(chinGeo, brushedSilverMat);
    chin.position.set(0, -0.21, 0.16);
    headGroup.add(chin);

    // KINETIC ORBITAL RINGS
    const ringsGroup = new THREE.Group();
    robotRoot.add(ringsGroup);

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xc7c7c7,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.008, 4, 48), ringMat1);
    ring1.rotation.x = Math.PI * 0.38;
    ring1.rotation.y = Math.PI * 0.12;
    ringsGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.007, 4, 48), ringMat2);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.z = Math.PI * 0.22;
    ringsGroup.add(ring2);

    // GPU-FRIENDLY OPTIMIZED PARTICLE SYSTEM
    const particleCount = prefersReducedMotion ? 60 : isMobile ? 120 : isLowEnd ? 280 : 550;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.2;
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

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.006;
      particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd8d8d8,
      size: isMobile ? 0.024 : 0.03,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    robotRoot.add(particleSystem);

    // LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(0x222222, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight1 = new THREE.DirectionalLight(0xffffff, 3.8);
    rimLight1.position.set(-4, 3, -3);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xa0a0a0, 2.5);
    rimLight2.position.set(4, -2, -2.5);
    scene.add(rimLight2);

    // RESIZE LISTENER
    let resizeTimeout: any;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // SMOOTH 60 FPS RENDER LOOP - DIRECTLY SAMPLES MUTABLE MOTION STATE
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      // Read directly from zero-overhead motionState (NO REACT RE-RENDERS!)
      const sp = motionState.scrollProgress;
      const sv = motionState.scrollVelocity;
      const mx = motionState.mouseX;
      const my = motionState.mouseY;

      const aspect = window.innerWidth / (window.innerHeight || 1);
      const desktopTargetX = aspect > 1.7 ? 2.05 : aspect > 1.4 ? 1.75 : 1.35;

      // 1. POSITIONING ACROSS SCROLL
      let targetX = isMobile ? 0 : desktopTargetX;
      let targetY = isMobile ? -0.4 : -0.05;
      let targetZ = isMobile ? -0.8 : (aspect > 1.7 ? 0.3 : 0);
      let targetRotY = -0.38;
      let targetRotX = 0.05;

      if (sp > 0.05 && sp <= 0.35) {
        const t = (sp - 0.05) / 0.3;
        targetX = THREE.MathUtils.lerp(isMobile ? 0 : desktopTargetX, isMobile ? 0 : 0.3, t);
        targetRotY = THREE.MathUtils.lerp(-0.38, 0.15, t);
        targetZ = THREE.MathUtils.lerp(0, 0.6, t);
      } else if (sp > 0.35 && sp <= 0.65) {
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

      // 2. IDLE BREATHING & SACCADES
      if (!prefersReducedMotion) {
        const breath = Math.sin(elapsed * 1.5) * 0.015;
        chestGroup.position.y = breath;
        collar.position.y = 0.32 + breath * 0.5;

        // Micro ocular pulsing
        const eyePulse = 0.85 + Math.sin(elapsed * 3.0) * 0.2;
        eyeLight.intensity = eyePulse;
        coreLight.intensity = 1.0 + Math.sin(elapsed * 2.0) * 0.25;

        // 3. MOUSE PARALLAX (Interpolated without lag)
        const mouseNormX = (mx - 0.5) * 2;
        const mouseNormY = (my - 0.5) * 2;

        const headTargetRotY = mouseNormX * (isMobile ? 0.15 : 0.4);
        const headTargetRotX = -mouseNormY * (isMobile ? 0.1 : 0.25);

        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, headTargetRotY, 0.05);
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, headTargetRotX, 0.05);

        upperBodyGroup.rotation.y = THREE.MathUtils.lerp(
          upperBodyGroup.rotation.y,
          targetRotY + mouseNormX * 0.12,
          0.04
        );
        upperBodyGroup.rotation.x = THREE.MathUtils.lerp(
          upperBodyGroup.rotation.x,
          targetRotX - mouseNormY * 0.06,
          0.04
        );

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseNormX * 0.18, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2 - mouseNormY * 0.12, 0.04);
      }

      // 4. KINETIC RINGS ROTATION
      const velocityBoost = Math.min(Math.abs(sv) * 0.03, 0.08);
      ring1.rotation.z += 0.003 + velocityBoost;
      ring2.rotation.y += 0.002 + velocityBoost;

      // 5. GPU PARTICLE SYSTEM DRIFT (Zero CPU buffer re-upload, 100% GPU accelerated)
      if (!prefersReducedMotion) {
        particleSystem.rotation.y += 0.0012 + velocityBoost * 0.04;
        particleSystem.rotation.x = Math.sin(elapsed * 0.25) * 0.04;
        particleSystem.position.y = Math.sin(elapsed * 0.4) * 0.05;
      }

      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
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

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 w-full h-full overflow-hidden flex items-center justify-end pr-16 opacity-30">
        <div className="w-96 h-96 rounded-full border border-neutral-700 bg-gradient-to-tr from-transparent via-neutral-900 to-white/5 blur-2xl" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full overflow-hidden"
      aria-hidden="true"
    />
  );
};
