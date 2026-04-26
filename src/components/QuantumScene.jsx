import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

import OpticalCavity from "./OpticalCavity.jsx";
import CavityPhotons from "./CavityPhotons.jsx";

const cavityRotation = [Math.PI / 10, Math.PI / 4, Math.PI / 40];

function PhotonSpeedLines() {
  const lines = useMemo(() => {
    return Array.from({ length: 320 }, (_, i) => ({
      id: i,
      x: -8 + Math.random() * 22,
      y: -7 + Math.random() * 10,
      z: -10 - Math.random() * 20,
      thickness: 0.004 + Math.random() * 0.035,
      opacity: 0.06 + Math.random() * 0.22,
    }));
  }, []);

  const lineLength = 60;
  const beamZ = -12;
  const scaleFactor = 3;

  return (
    <group
      position={[1, -2.5, -2]}
      rotation={[Math.PI / 10, Math.PI / 4, Math.PI / 40]}
    >
      {lines.map((line) => (
        <mesh
          key={line.id}
          position={[line.x, line.y, line.z]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[line.thickness, line.thickness, lineLength, 8]} />
          <meshBasicMaterial
            color="#005baa"
            transparent
            opacity={line.opacity}
            depthWrite={false}
            depthTest={true}
          />
        </mesh>
      ))}

      <mesh
        position={[3, 1.8, beamZ]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[scaleFactor, scaleFactor, scaleFactor]}
      >
        <cylinderGeometry args={[0.025, 0.025, lineLength, 16]} />
        <meshBasicMaterial
          color="#00aaff"
          transparent
          opacity={0.8}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>

      <mesh
        position={[3, 1.8, beamZ]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[scaleFactor, scaleFactor, scaleFactor]}
      >
        <cylinderGeometry args={[0.08, 0.08, lineLength, 16]} />
        <meshBasicMaterial
          color="#005baa"
          transparent
          opacity={0.2}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>
    </group>
  );
}

export default function QuantumScene() {
  const atom = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state, delta) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const t = maxScroll > 0 ? window.scrollY / maxScroll : 0;

    const approachEnd = 0.55;
    const orbitEnd = 0.82;

    let targetPosition;

    if (t < approachEnd) {
      const p = t / approachEnd;

      targetPosition = new THREE.Vector3(
        0.6 * p,
        0.7 - p * 0.55,
        13 - p * 10.5
      );
    } else if (t < orbitEnd) {
      const p = (t - approachEnd) / (orbitEnd - approachEnd);

      const angle = p * Math.PI;
      const radius = 1.2;

      targetPosition = new THREE.Vector3(
        Math.sin(angle) * radius,
        0.15,
        Math.cos(angle) * radius
      );
    } else {
      const p = (t - orbitEnd) / (1 - orbitEnd);

      targetPosition = new THREE.Vector3(
        0,
        0.5 + p * 0.8,
        -2.2 - p * 8
      );
    }

    easing.damp3(state.camera.position, targetPosition, 0.35, delta);
    state.camera.lookAt(atom);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <pointLight
        position={[-3, 2, 4]}
        color="#63eaff"
        intensity={2.3}
        distance={12}
      />

      <pointLight
        position={[2, -1, 1]}
        color="#ff3a93"
        intensity={1.8}
        distance={8}
      />

      <OpticalCavity />
      <CavityPhotons count={140} rotation={cavityRotation} />
      <PhotonSpeedLines />
    </>
  );
}