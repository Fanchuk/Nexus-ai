import CommandBar from "./components/CommandBar";
import CanvasBoard from "./components/CanvasBoard";
import ZoomControl from "./components/ZoomControl";

export default function CanvasPage() {
  return (
    <div className="canvas-grid relative min-h-svh">
      <div className="sticky top-0 z-30 border-b border-line/60 bg-ink/70 px-4 py-4 backdrop-blur-xl md:px-8">
        <CommandBar />
      </div>
      <CanvasBoard />
      <ZoomControl />
    </div>
  );
}