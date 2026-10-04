import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ContactRobotCanvasProps {
  isFormFocused: boolean;
}

export const ContactRobotCanvas: React.FC<ContactRobotCanvasProps> = ({ isFormFocused }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const focusedRef = useRef(false);

  useEffect(() => {
    focusedRef.current = isFormFocused;
  }, [isFormFocused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dark titanium & brushed chrome materials
    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x080808,
      metalness: 0.95,
      roughness: 0.16,
    });

    const brushedSilverMat = new THREE.MeshStandardMaterial({
      color: 0xb0b0b0,
      metalness: 0.92,
      roughness: 0.28,
    });

    const ocularGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // Robot Head Group
    const headGroup = new THREE.Group();
    scene.add(headGroup);

    // Cranium
    const craniumGeo = new THREE.SphereGeometry(1.2, 32, 24);
    craniumGeo.scale(0.85, 1.15, 1.05);
    const cranium = new THREE.Mesh(craniumGeo, darkTitaniumMat);
    headGroup.add(cranium);

    // Visor Shield
    const visorGeo = new THREE.CylinderGeometry(0.85, 0.78, 1.2, 32, 1, false, -Math.PI * 0.45, Math.PI * 0.9);
    const visor = new THREE.Mesh(visorGeo, darkTitaniumMat);
    visor.rotation.y = Math.PI;
    visor.position.set(0, 0.2, 0.5);
    headGroup.add(visor);

    // Ocular Eye Sensor Bar
    const ocularBarGeo = new THREE.BoxGeometry(0.8, 0.05, 0.15);
    const ocularBar = new THREE.Mesh(ocularBarGeo, ocularGlowMat);
    ocularBar.position.set(0, 0.35, 1.08);
    headGroup.add(ocularBar);

    // Jaw / Chin Assembly
    const jawGeo = new THREE.BoxGeometry(0.9, 0.6, 0.8);
    const jaw = new THREE.Mesh(jawGeo, darkTitaniumMat);
    jaw.position.set(0, -0.6, 0.4);
    headGroup.add(jaw);

    const chinEdge = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.4), brushedSilverMat);
    chinEdge.position.set(0, -0.9, 0.6);
    headGroup.add(chinEdge);

    // Temple Accents
    const temple1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16), brushedSilverMat);
    temple1.rotation.z = Math.PI / 2;
    temple1.position.set(-1.05, 0.25, 0.1);
    headGroup.add(temple1);

    const temple2 = temple1.clone();
    temple2.position.set(1.05, 0.25, 0.1);
    headGroup.add(temple2);

    // Neck Struts
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 0.8, 16), darkTitaniumMat);
    neck.position.set(0, -1.2, 0);
    headGroup.add(neck);

    // Lighting: Very dark with sharp metallic rim highlights
    const rimLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    rimLight1.position.set(-4, 3, -2);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0x888888, 1.8);
    rimLight2.position.set(4, -2, -2);
    scene.add(rimLight2);

    // Front soft key light
    const frontLight = new THREE.DirectionalLight(0x222222, 0.6);
    frontLight.position.set(0, 2, 4);
    scene.add(frontLight);

    // Ocular point light (activates on focus)
    const ocularPointLight = new THREE.PointLight(0xffffff, 0.1, 3.5);
    ocularPointLight.position.set(0, 0.35, 1.4);
    scene.add(ocularPointLight);

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

      // Slow majestic rotation
      headGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.32;
      headGroup.rotation.x = Math.sin(elapsed * 0.25) * 0.08 - 0.05;

      // Soft white/silver activation on form focus
      const isFocused = focusedRef.current;
      const targetIntensity = isFocused ? 2.2 : 0.2;
      const targetOcularOpacity = isFocused ? 1.0 : 0.25;

      ocularPointLight.intensity = THREE.MathUtils.lerp(
        ocularPointLight.intensity,
        targetIntensity,
        0.08
      );
      ocularGlowMat.color.setRGB(
        targetOcularOpacity,
        targetOcularOpacity,
        targetOcularOpacity
      );

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
      darkTitaniumMat.dispose();
      brushedSilverMat.dispose();
      ocularGlowMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden"
      aria-hidden="true"
    />
  );
};
