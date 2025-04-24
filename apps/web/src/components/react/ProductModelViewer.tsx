// TODO: support product variants

"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { getUrl } from "~/utils/get-url";
import type { Product } from "@synoem/payload/payload-types";
import { useMediaQuery } from "usehooks-ts";
import { motion } from "motion/react";

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
    <Suspense fallback={<ModelLoadingIndicator />}>
      <Canvas
        key={mountKey}
        className="w-full h-[400px] md:h-[600px] cursor-pointer"
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
    </Suspense>
  );
};

const ModelLoadingIndicator = () => {
  return (
    <div className="grid place-items-center h-[400px] md:h-[600px]">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-12 h-12">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-1 rounded-full border-4 border-t-primary border-l-transparent border-r-transparent border-b-transparent"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
        <p className="text-sm font-medium">Loading 3D Model...</p>
      </div>
    </div>
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
