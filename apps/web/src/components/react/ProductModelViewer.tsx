"use client";

import { useState, useEffect, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { getUrl } from "~/utils/get-url";
import type { Product } from "@synoem/payload/payload-types";
import { useMediaQuery } from "usehooks-ts";

export const ProductModelViewer = ({ three }: { three: Product["three"] }) => {
  if (!three?.model || typeof three.model === "number" || !three.model?.url) {
    console.warn("StandaloneModelViewer: No model provided");
    return null;
  }

  const modelUrl = getUrl(three.model.url);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [mountKey, setMountKey] = useState(Date.now());

  useEffect(() => {
    useGLTF.preload(modelUrl);
  }, [modelUrl]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setMountKey(Date.now());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <Canvas
      key={mountKey}
      className="w-full h-[400px] md:h-[600px]"
      gl={{
        powerPreference: "default",
        antialias: true,
        stencil: false,
        depth: true,
      }}
      camera={{
        position: isMobile ? [0, 0, 7] : [0, 0, 5],
        fov: isMobile ? 60 : 50,
      }}
    >
      <SceneContent url={modelUrl} />
    </Canvas>
  );
};

function SceneContent({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const controlsRef = useRef<any>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!scene) return;

    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = (isMobile ? 3.0 : 2.0) / maxDim;

    scene.scale.set(scale, scale, scale);
    scene.position.x = -center.x * scale;
    scene.position.y = -center.y * scale;
    scene.position.z = -center.z * scale;
  }, [scene, isMobile]);

  useEffect(() => {
    if (controlsRef.current) {
      setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.reset();
        }
      }, 50);
    }
  });

  return (
    <>
      <primitive object={scene} />
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 7]} intensity={1.5} />
      <directionalLight position={[-5, -10, -7]} intensity={0.5} />
      <gridHelper args={[100, 100]} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.25}
        autoRotate
        autoRotateSpeed={isMobile ? 0.5 : 1}
        minDistance={isMobile ? 3.5 : 2.5}
        maxDistance={isMobile ? 12 : 10}
        enableZoom
        enablePan={!isMobile}
      />
    </>
  );
}
