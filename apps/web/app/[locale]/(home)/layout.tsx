import { SceneCanvas } from "~/components/scene-canvas.client";
import { ReactLenis } from "lenis/react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <div className="fixed inset-0 pointer-events-none">
        <SceneCanvas />
      </div>
      <div className="relative">{children}</div>
    </ReactLenis>
  );
}
