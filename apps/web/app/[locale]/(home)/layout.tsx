// import { SceneCanvas } from "~/components/scene-canvas.client";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <div className="fixed inset-0 pointer-events-none">
        <SceneCanvas />
      </div> */}
      <div className="relative">{children}</div>
    </>
  );
}
