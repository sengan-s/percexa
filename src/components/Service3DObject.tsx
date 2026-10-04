import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Service3DObjectProps {
  type: 'cube' | 'neural' | 'torus' | 'cloud' | 'crystal';
  isHovered: boolean;
}

export const Service3DObject: React.FC<Service3DObjectProps> = ({ type, isHovered }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 110;
    const height = 110;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 20);
    camera.position.set(0, 0, 3.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Realistic brushed metallic materials
    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 0.94,
      roughness: 0.22,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.9,
      roughness: 0.3,
    });

    // Lights
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight.position.set(-2, -1, -2);
    scene.add(rimLight);

    const ambient = new THREE.AmbientLight(0x333333, 1.2);
    scene.add(ambient);

    const group = new THREE.Group();
    scene.add(group);

    // Create specific object based on type
    if (type === 'cube') {
      // Metallic geometric cube with inner core
      const outerCubeGeo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
      const outerCube = new THREE.Mesh(outerCubeGeo, silverMat);
      group.add(outerCube);

      const wireCubeGeo = new THREE.BoxGeometry(1.15, 1.15, 1.15);
      const wireCube = new THREE.Mesh(wireCubeGeo, wireMat);
      group.add(wireCube);

      const innerCoreGeo = new THREE.OctahedronGeometry(0.4, 0);
      const innerCore = new THREE.Mesh(innerCoreGeo, darkMetalMat);
      group.add(innerCore);
    } else if (type === 'neural') {
      // Abstract neural sphere
      const sphereGeo = new THREE.IcosahedronGeometry(0.75, 1);
      const sphereMesh = new THREE.Mesh(sphereGeo, wireMat);
      group.add(sphereMesh);

      const coreSphereGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const coreSphere = new THREE.Mesh(coreSphereGeo, silverMat);
      group.add(coreSphere);

      // Orbital electron nodes
      for (let i = 0; i < 6; i++) {
        const nodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const node = new THREE.Mesh(nodeGeo, silverMat);
        const angle = (i / 6) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, (Math.random() - 0.5) * 0.4);
        group.add(node);
      }
    } else if (type === 'torus') {
      // Metallic torus
      const torusGeo = new THREE.TorusGeometry(0.68, 0.22, 16, 40);
      const torus = new THREE.Mesh(torusGeo, silverMat);
      group.add(torus);

      const innerRingGeo = new THREE.TorusGeometry(0.78, 0.015, 8, 32);
      const innerRing = new THREE.Mesh(innerRingGeo, wireMat);
      innerRing.rotation.x = Math.PI / 3;
      group.add(innerRing);
    } else if (type === 'cloud') {
      // Minimal geometric wireframe cloud
      const cloudCenterGeo = new THREE.SphereGeometry(0.55, 12, 10);
      const cloudCenter = new THREE.Mesh(cloudCenterGeo, silverMat);
      group.add(cloudCenter);

      const leftBlobGeo = new THREE.SphereGeometry(0.38, 10, 8);
      const leftBlob = new THREE.Mesh(leftBlobGeo, darkMetalMat);
      leftBlob.position.set(-0.45, -0.1, 0.1);
      group.add(leftBlob);

      const rightBlobGeo = new THREE.SphereGeometry(0.42, 10, 8);
      const rightBlob = new THREE.Mesh(rightBlobGeo, silverMat);
      rightBlob.position.set(0.48, -0.05, 0.05);
      group.add(rightBlob);

      const cloudRingGeo = new THREE.TorusGeometry(0.95, 0.012, 6, 32);
      const cloudRing = new THREE.Mesh(cloudRingGeo, wireMat);
      cloudRing.rotation.x = Math.PI / 2.3;
      group.add(cloudRing);
    } else if (type === 'crystal') {
      // Metallic hexagonal faceted crystal
      const crystalGeo = new THREE.CylinderGeometry(0.01, 0.65, 1.35, 6);
      const crystal = new THREE.Mesh(crystalGeo, silverMat);
      group.add(crystal);

      const crystalWireGeo = new THREE.CylinderGeometry(0.01, 0.72, 1.45, 6);
      const crystalWire = new THREE.Mesh(crystalWireGeo, wireMat);
      group.add(crystalWire);
    }

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Floating oscillation
      group.position.y = Math.sin(elapsed * 2.2) * 0.06;

      // Rotation speed up on hover
      const rotSpeed = hoverRef.current ? 0.035 : 0.012;
      group.rotation.y += rotSpeed;
      group.rotation.x = Math.sin(elapsed * 1.2) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      silverMat.dispose();
      wireMat.dispose();
      darkMetalMat.dispose();
    };
  }, [type]);

  return <div ref={mountRef} className="w-[110px] h-[110px] flex items-center justify-center shrink-0 pointer-events-none" />;
};
