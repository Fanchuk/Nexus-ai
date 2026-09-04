"use client";

import { useState } from "react";
import { useCanvasStore } from "@/stores/canvas-store";
import { toast } from "@/stores/toast-store";
import { CanvasCard } from "../types";

function body(card: CanvasCard) {
  const data = card.data;
  if (data.answer) return data.answer;
  if (data.summary) return data.summary;
  if (data.keyPoints) return data.keyPoints;
  if (data.items?.length) return data.items.map((item) => `• ${item.title}`).join("\n");
  if (data.points?.length) return data.points.map((p) => `${p.label}: ${p.value}`).join("\n");
  return card.prompt || card.title;
}

export function useCanvasExport() {
  const [exporting, setExporting] = useState(false);

  async function exportPdf() {
    const cards = useCanvasStore.getState().cards;

    if (!cards.length) {
      toast.error("Canvas is empty");
      return;
    }

    setExporting(true);

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const width = 595 - 64;

      doc.setFontSize(18);
      doc.text("Canvas", 32, 48);
      doc.setFontSize(9);
      doc.setTextColor(130);
      doc.text(`${cards.length} cards · ${new Date().toLocaleDateString()}`, 32, 66);

      cards.forEach((card, index) => {
        doc.addPage();

        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`${index + 1} / ${cards.length} · ${card.type}`, 32, 40);

        doc.setFontSize(14);
        doc.setTextColor(20);
        doc.text(doc.splitTextToSize(card.title, width), 32, 66);

        doc.setFontSize(10);
        doc.setTextColor(60);
        doc.text(doc.splitTextToSize(body(card), width), 32, 96);

        const sources = card.data.sources ?? [];
        if (sources.length) {
          doc.setFontSize(8);
          doc.setTextColor(130);
          doc.text(
            sources.map((source, i) => `[${i + 1}] ${source.domain}`),
            32,
            780 - sources.length * 11
          );
        }
      });

      doc.save("canvas.pdf");
      toast.success("PDF exported");
    } catch {
      toast.error("Export failed");
    } finally {
      setExporting(false);
    }
  }

  return { exporting, exportPdf };
}