export default function CanvasLinks() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 1120 780"
      fill="none"
    >
      <defs>
        <marker id="canvas-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9" fill="none" stroke="#8a8a92" strokeWidth="1.2" />
        </marker>
      </defs>

      <path
        d="M304 120 C 332 120, 348 120, 374 120"
        stroke="#8a8a92"
        strokeWidth="1.5"
        strokeDasharray="5 6"
        markerEnd="url(#canvas-arrow)"
      />
      <path
        d="M304 450 C 360 490, 380 520, 414 550"
        stroke="#8a8a92"
        strokeWidth="1.5"
        strokeDasharray="5 6"
        markerEnd="url(#canvas-arrow)"
      />
    </svg>
  );
}