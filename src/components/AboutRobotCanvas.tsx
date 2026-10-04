import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AboutRobotCanvasProps {
  inViewProgress: number; // 0 to 1
}

export const AboutRobotCanvas: React.FC<AboutRobotCanvasProps> = ({ inViewProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = inViewProgress;
  }, [inViewProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dark materials: Only silver edges and mechanical details catching rim lights
    const darkObsidianMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      metalness: 0.98,
      roughness: 0.15,
    });

    const brushedSilverEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d4,
      metalness: 0.95,
      roughness: 0.22,
    });

    const ocularSlitMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Torso silhouette
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 0.8), darkObsidianMat);
    torso.position.y = -0.9;
    robotGroup.add(torso);

    const collarLine = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.04, 0.75), brushedSilverEdgeMat);
    collarLine.position.set(0, -0.3, 0.05);
    robotGroup.add(collarLine);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.45, 16), darkObsidianMat);
    neck.position.y = -0.1;
    robotGroup.add(neck);

    // Head (turns toward viewer)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.35, 0);
    robotGroup.add(headGroup);

    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 24), darkObsidianMat);
    cranium.scale.set(0.85, 1.15, 1.05);
    headGroup.add(cranium);

    // Silver side edge crest
    const crest = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.012, 8, 32, Math.PI * 0.75), brushedSilverEdgeMat);
    crest.rotation.y = Math.PI / 2;
    crest.rotation.x = -Math.PI * 0.15;
    headGroup.add(crest);

    // Angular Visor Shield
    const visor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.35, 0.52, 24, 1, false, -Math.PI * 0.45, Math.PI * 0.9),
      darkObsidianMat
    );
    visor.rotation.y = Math.PI;
    visor.position.set(0, 0.12, 0.25);
    headGroup.add(visor);

    // Thin silver ocular slit
    const ocularSlit = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.018, 0.1), ocularSlitMat);
    ocularSlit.position.set(0, 0.16, 0.5);
    headGroup.add(ocularSlit);

    // Mechanical jaw highlight
    const jawRim = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.03, 0.3), brushedSilverEdgeMat);
    jawRim.position.set(0, -0.22, 0.35);
    headGroup.add(jawRim);

    // LIGHTING: Atmospheric rim lights carving metallic silver edges out of deep shadow
    const sharpRimLight = new THREE.DirectionalLight(0xffffff, 4.5);
    sharpRimLight.position.set(-3.5, 2.5, -2);
    scene.add(sharpRimLight);

    const secondaryRimLight = new THREE.DirectionalLight(0x777777, 2.2);
    secondaryRimLight.position.set(3, -1, -2.5);
    scene.add(secondaryRimLight);

    const ambientShadow = new THREE.AmbientLight(0x0a0a0a, 0.8);
    scene.add(ambientShadow);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const p = progressRef.current;

      // Subtle breathing in the dark
      robotGroup.position.y = Math.sin(elapsed * 1.4) * 0.02;

      // As user scrolls, robot slowly turns its head toward the viewer
      // Initially profiles away (-0.6 rad), turns directly to viewer (~0 rad)
      const targetHeadY = THREE.MathUtils.lerp(-0.7, 0.05, p);
      const targetHeadX = THREE.MathUtils.lerp(0.12, -0.04, p);

      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetHeadY, 0.05);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetHeadX, 0.05);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      darkObsidianMat.dispose();
      brushedSilverEdgeMat.dispose();
      ocularSlitMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[420px] md:h-[540px] flex items-center justify-center relative overflow-hidden"
    />
  );
};
