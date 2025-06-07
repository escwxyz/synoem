// TODO: support product variants

"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import {
  useGLTF,
  // PresentationControls,
  ContactShadows,
  Environment,
  PresentationControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { getUrl } from "~/utils/get-url";
import type { SolarPanel, PumpController } from "@synoem/types";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import { motion } from "motion/react";
import { cn } from "@synoem/ui/lib/utils";
import {
  ProductAnnotation,
  type AnnotationData,
  type ProductAnnotationProps,
} from "./product-annotation.client";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

type ProductModelViewerProps = {
  three: NonNullable<SolarPanel["three"]> | NonNullable<PumpController["three"]>;
  className?: string;
  annotations?: AnnotationData[];
  showAnnotations?: boolean;
  showGrid?: boolean;
} & Omit<ProductAnnotationProps, "data">;

export const ProductModelViewer = ({
  three,
  className,
  showAnnotations = false,
  annotations = [],
  showGrid = false,
  ...props
}: ProductModelViewerProps) => {
  if (!three.model || typeof three.model !== "object" || !three.model?.url) {
    console.log("ProductModelViewer: No model provided");
    return null;
  }

  const modelUrl = getUrl(three.model.url);

  const isMobile = useIsMobile();

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

    const handleHeroModelRestore = () => {
      setMountKey(Date.now());
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("hero-model-restore", handleHeroModelRestore);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("hero-model-restore", handleHeroModelRestore);
    };
  }, []);

  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Suspense fallback={<ModelLoadingIndicator />}>
      <Canvas
        key={mountKey}
        className={cn("w-full h-[400px] md:h-[600px] bg-transparent", className)}
        shadows
        camera={{
          position: isMobile ? [0, 0, 7] : [0, 0, 5],
          fov: isMobile ? 60 : 50,
        }}
      >
        <ambientLight intensity={0.75} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          shadow-mapSize={2048}
          castShadow
        />
        <PresentationControls
          enabled
          speed={2.5}
          rotation={[-0.05, (3.5 / 4) * Math.PI, 0.05]}
          polar={[-Math.PI / 3, Math.PI / 3]}
        >
          <SceneContent
            url={modelUrl}
            annotations={showAnnotations ? annotations : []}
            {...props}
          />
          {showGrid && <gridHelper args={[10, 10]} />}
        </PresentationControls>
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.75}
          scale={10}
          blur={4}
          far={4}
          color={isDark ? "white" : "black"}
        />
      </Canvas>
    </Suspense>
  );
};

const ModelLoadingIndicator = () => {
  const t = useTranslations("Component");

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
        <p className="text-sm font-medium">{t("ModelLoadingIndicator.loading")}</p>
      </div>
    </div>
  );
};

type SceneContentProps = {
  url: string;
  disableControls?: boolean;
  showGrid?: boolean;
  annotations?: AnnotationData[];
} & Omit<ProductAnnotationProps, "data">;

function SceneContent({ url, annotations = [], ...props }: SceneContentProps) {
  const { scene, nodes } = useGLTF(url);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const controlsRef = useRef<any>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!scene) return;

    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = (isMobile ? 3.0 : 2.5) / maxDim;

    scene.scale.set(scale, scale, scale);
    scene.position.x = -center.x * scale;
    scene.position.y = -center.y * scale;
    scene.position.z = -center.z * scale;
  }, [scene, isMobile]);

  return (
    <group>
      <primitive object={scene} />
      {annotations.length > 0 &&
        annotations.map((annotation) => (
          <ProductAnnotation key={annotation.id} data={annotation} {...props} />
        ))}
    </group>
  );
}
