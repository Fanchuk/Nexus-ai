import { CARD_CONFIG } from "@/features/canvas/config";
import { PreviewCard } from "../types";

export default function CanvasPreview({ cards }: { cards: PreviewCard[] }) {
  if (!cards.length) return <div className="canvas-grid h-36 bg-ink" />;

  const xs = cards.map((card) => card.x);
  const ys = cards.map((card) => card.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const spanX = Math.max(...xs) - minX || 1;
  const spanY = Math.max(...ys) - minY || 1;

  return (
    <div className="canvas-grid relative h-36 bg-ink">
      {cards.map((card, index) => (
        <span
          key={index}
          style={{
            left: `${8 + ((card.x - minX) / spanX) * 62}%`,
            top: `${12 + ((card.y - minY) / spanY) * 58}%`,
          }}
          className={`absolute h-8 w-20 rounded-lg bg-linear-to-br opacity-80 ${CARD_CONFIG[card.type].gradient}`}
        />
      ))}
    </div>
  );
}