"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Model3D } from "~/stores/models";
import * as THREE from "three";

export const AnimatedModel = (props: Model3D) => {
  const {
    url,
    position: initialPosition,
    rotation: initialRotation,
    scale: initialScale,
    animations,
  } = props;

  const modelRef = useRef<THREE.Object3D>(null);

  const { scrollYProgress } = useScroll();

  const model = useGLTF(url);

  const { lerp } = THREE.MathUtils;

  useFrame(() => {
    if (!modelRef.current) return;

    const progress = scrollYProgress.get();
    const finalPosition = [...initialPosition];
    const finalRotation = [...initialRotation];
    let finalScale = initialScale;

    for (const animation of animations) {
      if (animation.trigger === "scroll" && animation.scrollSettings) {
        const { values, type } = animation;

        switch (type) {
          case "position": {
            if (values.position) {
              const { from, to } = values.position;
              finalPosition[0] = lerp(from.x, to.x, progress);
              finalPosition[1] = lerp(from.y, to.y, progress);
              finalPosition[2] = lerp(from.z, to.z, progress);
            }
            break;
          }
          case "rotation": {
            if (values.rotation) {
              const { from, to } = values.rotation;
              finalRotation[0] = lerp(from.x, to.x, progress);
              finalRotation[1] = lerp(from.y, to.y, progress);
              finalRotation[2] = lerp(from.z, to.z, progress);
            }
            break;
          }
          case "scale": {
            if (values.scale) {
              const { from, to } = values.scale;
              finalScale = lerp(from, to, progress);
            }
            break;
          }
        }
      }
    }

    modelRef.current?.position.set(
      finalPosition[0] ?? 0,
      finalPosition[1] ?? 0,
      finalPosition[2] ?? 0,
    );
    modelRef.current.rotation.set(
      finalRotation[0] ?? 0,
      finalRotation[1] ?? 0,
      finalRotation[2] ?? 0,
    );
    modelRef.current.scale.setScalar(finalScale);

    // add more animations here
  });

  return (
    <primitive
      ref={modelRef}
      object={model.scene}
      position={initialPosition}
      rotation={initialRotation}
      scale={initialScale}
    />
  );
};
