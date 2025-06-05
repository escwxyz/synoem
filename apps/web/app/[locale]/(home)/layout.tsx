// import { SceneCanvas } from "~/components/scene-canvas.client";

import { ScrollListener } from "~/components/scroll-listener.client";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollListener />
      {/* <div className="fixed inset-0 pointer-events-none">
        <SceneCanvas />
      </div> */}
      <div className="relative">{children}</div>
    </>
  );
}
