import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { X, RotateCcw, Eye, Layers, Maximize2, Shield, Cpu, Activity, ZoomIn, ZoomOut } from 'lucide-react';
import { sound } from '../utils/sound';

interface RobotInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const RobotInspectorModal: React.FC<RobotInspectorModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'exploded' | 'optics'>('solid');
  const [activePart, setActivePart] = useState<string>('cranial');
  const [zoomLevel, setZoomLevel] = useState<number>(4.8);

  const viewModeRef = useRef(viewMode);
  viewModeRef.current = viewMode;

  const parts = {
    cranial: {
      title: 'Cranial Titanium Exoshell',
      material: 'Brushed Aerospace Titanium 6Al-4V',
      spec: 'Aerodynamic computational helmet housing high-bandwidth neuromorphic coprocessors.',
      sub: 'TOLERANCE: 0.002mm // THERMAL DISSIPATION: PASSIVE',
    },
    optics: {
      title: 'Photonic Ocular Visor Bar',
      material: 'Anti-Reflective Sapphire Crystal',
      spec: 'Sub-millisecond low-latency stereoscopic computer vision array with dual LiDAR depth mapping.',
      sub: 'SPECTRAL BAND: 380nm - 1100nm // LATENCY: 0.12ms',
    },
    cervical: {
      title: 'Cervical Hydraulic Actuators',
      material: 'Micro-Machined Hardened Chrome Steel',
      spec: 'Dual-piston hydraulic stabilization balancing dynamic inertia across 6-DOF movements.',
      sub: 'PEAK FORCE: 450N // FREQUENCY: 240Hz RESPONSE',
    },
    sternum: {
      title: 'Sternum Solid-State Photonic Core',
      material: 'Zero-Thermal Expansion Invar Chassis',
      spec: 'Central distributed AI reasoning nexus coordinating sensor fusion and joint trajectories.',
      sub: 'THROUGHPUT: 128 TFLOPS (INT8) // ZERO FLUID COOLING',
    },
  };

  useEffect(() => {
    if (!isOpen) return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.06);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.2, zoomLevel);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // MATERIALS
    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xdcdcdc,
      metalness: 0.94,
      roughness: 0.2,
    });

    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f0f,
      metalness: 0.96,
      roughness: 0.15,
    });

    const brightMetalMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      metalness: 0.98,
      roughness: 0.1,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    const glowCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // ROBOT ASSEMBLY
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    // Pectoral Shells
    const leftPec = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.42, 0.36), silverMat);
    leftPec.position.set(-0.3, 0.05, 0.12);
    robotRoot.add(leftPec);

    const rightPec = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.42, 0.36), silverMat);
    rightPec.position.set(0.3, 0.05, 0.12);
    robotRoot.add(rightPec);

    // Sternum Core
    const sternum = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.54, 0.38), darkTitaniumMat);
    sternum.position.set(0, 0.02, 0.14);
    robotRoot.add(sternum);

    const coreLight = new THREE.PointLight(0xffffff, 1.4, 3);
    coreLight.position.set(0, 0.08, 0.4);
    robotRoot.add(coreLight);

    const coreEmitter = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 24), glowCoreMat);
    coreEmitter.rotation.x = Math.PI / 2;
    coreEmitter.position.set(0, 0.08, 0.34);
    robotRoot.add(coreEmitter);

    // Spine
    for (let i = 0; i < 5; i++) {
      const vert = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.08, 16), darkTitaniumMat);
      vert.position.y = -0.3 - i * 0.12;
      robotRoot.add(vert);
    }

    // Collar
    const collar = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.08, 0.3), darkTitaniumMat);
    collar.position.set(0, 0.32, 0.08);
    robotRoot.add(collar);

    // Shoulders
    const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), darkTitaniumMat);
    leftShoulder.position.set(-0.76, 0.22, 0.02);
    robotRoot.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), darkTitaniumMat);
    rightShoulder.position.set(0.76, 0.22, 0.02);
    robotRoot.add(rightShoulder);

    // Cranium & Face
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.6, 0.02);
    robotRoot.add(headGroup);

    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 24), silverMat);
    cranium.scale.set(0.85, 1.1, 1.05);
    cranium.position.set(0, 0.12, -0.02);
    headGroup.add(cranium);

    const visor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.22, 0.36, 24, 1, false, -Math.PI * 0.45, Math.PI * 0.9),
      darkTitaniumMat
    );
    visor.rotation.y = Math.PI;
    visor.position.set(0, 0.08, 0.15);
    headGroup.add(visor);

    const ocular = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.026, 0.06), glowCoreMat);
    ocular.position.set(0, 0.11, 0.3);
    headGroup.add(ocular);

    // LIGHTING
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const rimLight1 = new THREE.DirectionalLight(0xffffff, 4.0);
    rimLight1.position.set(-4, 2, -3);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0x888888, 2.5);
    rimLight2.position.set(4, -2, -2);
    scene.add(rimLight2);

    const ambient = new THREE.AmbientLight(0x222222, 1.2);
    scene.add(ambient);

    // MOUSE DRAG ORBIT
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotY = 0;
    let rotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      rotY += dx * 0.008;
      rotX += dy * 0.006;
      rotX = Math.max(-0.6, Math.min(0.6, rotX));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // View mode behavior
      const mode = viewModeRef.current;

      if (mode === 'exploded') {
        // Displace pieces outward
        leftPec.position.x = THREE.MathUtils.lerp(leftPec.position.x, -0.65, 0.08);
        rightPec.position.x = THREE.MathUtils.lerp(rightPec.position.x, 0.65, 0.08);
        cranium.position.y = THREE.MathUtils.lerp(cranium.position.y, 0.45, 0.08);
        leftShoulder.position.x = THREE.MathUtils.lerp(leftShoulder.position.x, -1.15, 0.08);
        rightShoulder.position.x = THREE.MathUtils.lerp(rightShoulder.position.x, 1.15, 0.08);
      } else {
        // Normal assembly
        leftPec.position.x = THREE.MathUtils.lerp(leftPec.position.x, -0.3, 0.08);
        rightPec.position.x = THREE.MathUtils.lerp(rightPec.position.x, 0.3, 0.08);
        cranium.position.y = THREE.MathUtils.lerp(cranium.position.y, 0.12, 0.08);
        leftShoulder.position.x = THREE.MathUtils.lerp(leftShoulder.position.x, -0.76, 0.08);
        rightShoulder.position.x = THREE.MathUtils.lerp(rightShoulder.position.x, 0.76, 0.08);
      }

      // Wireframe toggle
      const isWire = mode === 'wireframe';
      silverMat.wireframe = isWire;
      darkTitaniumMat.wireframe = isWire;

      // Optics focus
      if (mode === 'optics') {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2.4, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.68, 0.08);
      } else {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, zoomLevel, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2, 0.08);
      }

      // Smooth rotation
      if (!isDragging) {
        rotY += 0.003;
      }

      robotRoot.rotation.y = THREE.MathUtils.lerp(robotRoot.rotation.y, rotY, 0.1);
      robotRoot.rotation.x = THREE.MathUtils.lerp(robotRoot.rotation.x, rotX, 0.1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      silverMat.dispose();
      darkTitaniumMat.dispose();
      brightMetalMat.dispose();
      wireframeMat.dispose();
      glowCoreMat.dispose();
    };
  }, [isOpen, zoomLevel]);

  if (!isOpen) return null;

  const currentPartData = parts[activePart as keyof typeof parts] || parts.cranial;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 overflow-hidden">
      <div
        className="relative w-full max-w-5xl h-[90vh] bg-[#070707] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl flex flex-col font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Bar */}
        <div className="p-4 border-b border-neutral-800 bg-[#040404] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <h3 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight uppercase">
              3D ROBOT LAB INSPECTION BAY // PROTOTYPE X-1
            </h3>
            <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 hidden sm:inline">
              INTERACTIVE 360° ORBIT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Bar */}
        <div className="px-5 py-2.5 border-b border-neutral-800/80 bg-[#060606] flex items-center justify-between gap-3 overflow-x-auto text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-500 uppercase pr-1">RENDER MODE:</span>
            {[
              { id: 'solid', label: 'Solid Chrome', icon: Layers },
              { id: 'wireframe', label: 'Wireframe X-Ray', icon: Maximize2 },
              { id: 'exploded', label: 'Exploded Actuators', icon: RotateCcw },
              { id: 'optics', label: 'Optics Macro', icon: Eye },
            ].map((m) => {
              const Icon = m.icon;
              const isActive = viewMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    sound.playClick();
                    setViewMode(m.id as any);
                  }}
                  className={`px-3 py-1.5 rounded flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-900 text-white border-neutral-600 shadow-sm'
                      : 'text-neutral-400 border-neutral-900 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-medium">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(3.2, z - 0.5))}
              className="p-1.5 rounded border border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.min(7.0, z + 0.5))}
              className="p-1.5 rounded border border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main 3D Canvas Area */}
        <div className="relative flex-1 bg-[#030303] overflow-hidden flex items-center justify-center">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Drag instruction overlay */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-neutral-500 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded border border-neutral-800 pointer-events-none">
            MOUSE DRAG / TOUCH TO ORBIT 360° · SCROLL TO ZOOM
          </div>

          {/* Component Hotspots Selector */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-20">
            {Object.keys(parts).map((key) => {
              const item = parts[key as keyof typeof parts];
              const isSelected = activePart === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    sound.playClick();
                    setActivePart(key);
                  }}
                  className={`px-3 py-1.5 text-left text-xs font-mono rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900/90 text-white border-neutral-500 shadow-md'
                      : 'bg-black/60 backdrop-blur-sm text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-neutral-600'}`} />
                    <span>{item.title.split(' ')[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Part Telemetry Card (Bottom Left) */}
          <div className="absolute bottom-6 left-6 max-w-sm bg-black/80 backdrop-blur-md border border-neutral-800 p-4 rounded z-20 space-y-1.5">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              COMPONENT SPECIFICATION
            </div>
            <h4 className="font-heading text-sm font-bold text-white tracking-tight">
              {currentPartData.title}
            </h4>
            <div className="text-xs text-neutral-300 font-mono">
              MATERIAL: {currentPartData.material}
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              {currentPartData.spec}
            </p>
            <div className="text-[9px] font-mono text-neutral-500 pt-1 border-t border-neutral-900">
              {currentPartData.sub}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-[#050505] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <span className="text-xs text-neutral-400 font-sans">
            Need custom robotics software, real-time edge computer vision, or embedded inference?
          </span>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-black hover:bg-neutral-200 rounded text-xs font-semibold tracking-wide transition-all cursor-pointer"
          >
            Consult AI Robotics Team
          </button>
        </div>
      </div>
    </div>
  );
};
