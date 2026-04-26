import { Canvas } from "@react-three/fiber";
import QuantumScene from "./QuantumScene.jsx";

export default function QuantumBackground() {
  return (
    <div className="quantum-background">
      <Canvas
        camera={{ position: [0, 0.7, 13], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050a14"]} />
        <fog attach="fog" args={["#030712", 14, 46]} />

        <QuantumScene />
      </Canvas>
    </div>
  );
}