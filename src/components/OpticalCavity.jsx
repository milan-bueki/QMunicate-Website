import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Mirror({ position, rotation }) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[0.85, 1.25, 0.35, 96, 1, false]} />
      <meshStandardMaterial
  color="#5b5e61"
  emissive="#0a1a2a"       
  metalness={0.3}
  roughness={0.1}
  transparent
  opacity={0.8}
  depthWrite={true}
/>
    </mesh>
  );
}

function Atom({ position }) {
  const ringsRef = useRef([]);

  useFrame((state) => {
    ringsRef.current.forEach((ring, i) => {
      if (!ring) return;

      // Rotation
      ring.rotation.y += 0.01 + i * 0.003;
      ring.rotation.x += 0.005;
    });
  });

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#fa1a1a" emissive="#1d5eff" depthWrite={true} />
      </mesh>

      {[0, Math.PI / 3, -Math.PI / 3].map((r, i) => (
  <group
    key={i}
    ref={(el) => (ringsRef.current[i] = el)}
    rotation={[r, 0, i * Math.PI * 0.35]}
  >
    <mesh>
      <torusGeometry args={[0.28, 0.008, 12, 80]} />
      <meshStandardMaterial color="#9fd7ff" emissive="#3aa0ff" depthWrite={true} />
    </mesh>

    <mesh position={[0.28, 0, 0]}>
      <sphereGeometry args={[0.035, 16, 16]} />
      <meshStandardMaterial color="#ffffff" emissive="#7cc7ff" depthWrite={true} />
    </mesh>
  </group>
))}
    </group>
  );
}



function LaserBetweenMirrors({ x }) {
  const length = 5;
  const segments = 12;
  const segmentLength = length / segments;

  return (
    <group position={[x, 0, 0]}>
      {[...Array(segments)].map((_, i) => {
        const yTop = length / 2 - i * segmentLength;
        const yBottom = yTop - segmentLength;
        const yMiddle = (yTop + yBottom) / 2;

        // Abstand zur Mitte: außen = 1, Mitte = 0
        const distTop = Math.abs(yTop) / (length / 2);
        const distBottom = Math.abs(yBottom) / (length / 2);
        const distMiddle = Math.abs(yMiddle) / (length / 2);

        // außen dick, Mitte dünn
        const radiusTop = 0.035 + distTop * 0.09;
        const radiusBottom = 0.035 + distBottom * 0.09;

        // außen transparenter, Mitte weniger transparent
        const opacity = 0.2 + (1 - distMiddle) * 0.75;

        return (
          <mesh key={i} position={[0, yMiddle, 0]}>
            <cylinderGeometry
              args={[radiusTop, radiusBottom, segmentLength, 32]}
            />
            <meshStandardMaterial
              color="red"
              emissive="red"
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </group>
  );
}


function LaserBetweenMirrors2({ x }) {
  const length = 5;

  return (
    <group position={[x, 0, 0]}>
      {/* äußerer breiter, transparenter Glow */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, length, 32]} />
        <meshStandardMaterial
          color="red"
          emissive="red"
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* innerer dünner, stärker sichtbarer Kern */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, length, 32]} />
        <meshStandardMaterial
          color="red"
          emissive="red"
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}

function CavityGlow() {
  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[0, 0, Math.PI / 2]}
    >
      <cylinderGeometry args={[0.5, 0.5, 2.4, 64, 1, true]} />
      <meshBasicMaterial
        color="#0095c7"
        transparent
        opacity={0.08}
        side={2}
        depthWrite={false}
      />
    </mesh>
  );
}


export default function OpticalCavity() {
  return (
      <group
        scale={1.1}
        position={[0, 0, 0]}
        rotation={[Math.PI / 10, Math.PI / 4, Math.PI / 40]}
      >
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 4, 5]} intensity={1.4} />

      <Mirror position={[-1.35, 0, 0]} rotation={[0, 0, -Math.PI / 2]} />
      <Mirror position={[1.35, 0, 0]} rotation={[0, 0, Math.PI / 2]} />

      <CavityGlow />

      <Atom position={[0.4, 0, 0]} />
      <Atom position={[-0.4, 0, 0]} />

      <LaserBetweenMirrors x={0.4} />
      <LaserBetweenMirrors x={-0.4} />
    </group>
  );
}