"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useAtomValue } from "jotai";
import { modelsAtom } from "~/stores/models";
import { AnimatedModel } from "./AnimatedModel";

const SceneContainer = () => {
  const models = useAtomValue(modelsAtom);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <TestCube />
      {models.map((model) => (
        <AnimatedModel key={model.id} {...model} />
      ))}
    </>
  );
};

export const SceneCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      className="pointer-events-auto"
      style={{
        touchAction: "none",
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <SceneContainer />
      </Suspense>
    </Canvas>
  );
};

const TestCube = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};
