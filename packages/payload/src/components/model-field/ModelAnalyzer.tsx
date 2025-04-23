"use client";

import type React from "react";
import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Button, Card } from "@payloadcms/ui";

export interface ModelNodeInfo {
  name: string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface ModelMaterialInfo {
  name: string;
  type: string;
  color: string | null;
}

export interface ModelInfo {
  nodes: ModelNodeInfo[];
  materials: ModelMaterialInfo[];
  nodeNames: string[];
  boundingBox?: {
    min: [number, number, number];
    max: [number, number, number];
  } | null;
}

interface ModelAnalyzerProps {
  onModelInfoExtracted: (modelInfo: ModelInfo) => void;
  value?: ModelInfo;
  modelUrl?: string;
}

export const ModelAnalyzer: React.FC<ModelAnalyzerProps> = ({
  value,
  modelUrl,
  onModelInfoExtracted,
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(!!value);
  const [error, setError] = useState<string | null>(null);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const gltfRef = useRef<any>(null);

  const analyzeModel = async () => {
    if (!modelUrl) return;

    if (!isValidModelFormat(modelUrl)) {
      setError("Only .glb or .gltf format 3D models are supported.");
      return;
    }

    useGLTF.preload(modelUrl);

    try {
      setAnalyzing(true);
      setError(null);

      const gltf = useGLTF(modelUrl);
      gltfRef.current = gltf;

      const { scene, nodes } = gltf;

      const extractedNodes: ModelNodeInfo[] = [];
      const extractedMaterials: Record<string, ModelMaterialInfo> = {};

      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;

          extractedNodes.push({
            name: mesh.name,
            type: "Mesh",
            position: mesh.position.toArray() as [number, number, number],
            rotation: mesh.rotation.toArray().slice(0, 3) as [
              number,
              number,
              number,
            ],
            scale: mesh.scale.toArray() as [number, number, number],
          });

          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              for (const mat of mesh.material) {
                if (mat && !extractedMaterials[mat.name]) {
                  const material = mat as THREE.MeshStandardMaterial;
                  extractedMaterials[material.name] = {
                    name: material.name,
                    type: material.type,
                    color: material.color
                      ? `#${material.color.getHexString()}`
                      : null,
                  };
                }
              }
            } else if (!extractedMaterials[mesh.material.name]) {
              const material = mesh.material as THREE.MeshStandardMaterial;
              extractedMaterials[material.name] = {
                name: material.name,
                type: material.type,
                color: material.color
                  ? `#${material.color.getHexString()}`
                  : null,
              };
            }
          }
        }
      });

      let boundingBox = null;
      if (scene.children[0]) {
        const bbox = new THREE.Box3().setFromObject(scene);
        boundingBox = {
          min: bbox.min.toArray() as [number, number, number],
          max: bbox.max.toArray() as [number, number, number],
        };
      }

      const modelInfo: ModelInfo = {
        nodes: extractedNodes,
        materials: Object.values(extractedMaterials),

        nodeNames: Object.keys(nodes).filter((key) => {
          const obj = nodes[key];
          return (
            obj && typeof obj === "object" && "isMesh" in obj && obj.isMesh
          );
        }),
        boundingBox,
      };

      setAnalyzing(false);
      setAnalyzed(true);

      onModelInfoExtracted(modelInfo);
    } catch (error) {
      console.error("Error analyzing model:", error);
      setError(
        "Model analysis failed, please ensure the file format is correct and not damaged."
      );
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      {modelUrl && (
        <>
          {isValidModelFormat(modelUrl) ? (
            <div className="w-full h-[400px] border rounded-md overflow-hidden bg-muted-background">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full">
                    Loading model...
                  </div>
                }
              >
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 10]} intensity={1} />
                  <ModelPreview url={modelUrl} />
                </Canvas>
              </Suspense>
            </div>
          ) : (
            <div className="w-full h-[400px] border rounded-md overflow-hidden bg-muted-background flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-red-500 mb-2">Unsupported file format</p>
                <p>Only .glb or .gltf format 3D models are supported</p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            {!analyzed && (
              <Button
                onClick={analyzeModel}
                disabled={analyzing || !!error || !isValidModelFormat(modelUrl)}
                className="btn btn-primary"
              >
                {analyzing ? "Analyzing..." : "Analyze Model Structure"}
              </Button>
            )}

            {analyzed && (
              <Button
                onClick={() => setAnalyzed(false)}
                className="btn btn-secondary"
              >
                Reanalyze
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

interface ModelPreviewProps {
  url: string;
}

const ModelPreview = ({ url }: ModelPreviewProps) => {
  const { scene } = useGLTF(url);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!scene) return;

    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.0 / maxDim;

    scene.scale.set(scale, scale, scale);
    scene.position.x = -center.x * scale;
    scene.position.y = -center.y * scale;
    scene.position.z = -center.z * scale;
  }, [scene]);

  return (
    <>
      <primitive object={scene} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.25}
        enableZoom
        enablePan
      />
    </>
  );
};

const isValidModelFormat = (url: string): boolean => {
  const extension = url.split(".").pop()?.toLowerCase();
  return ["glb", "gltf"].includes(extension || "");
};
