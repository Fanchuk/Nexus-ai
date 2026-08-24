import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { getCanvas } from "./queries";
import { CardType } from "../types";
import CanvasBoard from "../components/CanvasBoard";

export default async function CanvasScreen({ canvasId }: { canvasId?: string }) {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const [canvas, settings] = await Promise.all([
    getCanvas(user.id, canvasId),
    prisma.settings.findUnique({ where: { userId: user.id } }),
  ]);

  return (
    <CanvasBoard
      initial={canvas}
      defaultMode={(settings?.defaultMode ?? "WEB") as CardType}
      showGrid={settings?.showGrid ?? true}
      lastViewport={{
        x: settings?.lastX ?? 0,
        y: settings?.lastY ?? 0,
        zoom: settings?.lastZoom ?? 1,
      }}
    />
  );
}