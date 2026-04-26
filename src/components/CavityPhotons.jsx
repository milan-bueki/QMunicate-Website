import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function CavityPhotons({
  count = 30,
  rotation = [0, 0, 0],
}) {
  const refs = useRef([]);

  const photons = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: 0.35 + i * 0.18, 
        y: 0,
        z: 0,
        speed: 0.035 + Math.random() * 0.025,
        size: 0.035 + Math.random() * 0.02,
      })),
    [count]
  );

  useFrame(() => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;

      const p = photons[i];

      // Bewegung entlang lokaler X-Achse
      mesh.position.x += p.speed;

      // Reset nahe Spiegel
      if (mesh.position.x > 30) {
        mesh.position.x = 0.6;
      }
    });
  });

  return (
    <group
      rotation={rotation}
      position={[0.85, 0.4, -1.2]} // Startpunkt am Spiegel
    >
      {photons.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={[p.x, p.y, p.z]}
        >
          <sphereGeometry args={[p.size, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={2.5}
          />
        </mesh>
      ))}
    </group>
  );
}