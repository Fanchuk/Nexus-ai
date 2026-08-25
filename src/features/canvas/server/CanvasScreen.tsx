import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { getCanvas } from "./queries";
import { CardType } from "../types";
import CanvasBoard from "../components/CanvasBoard";

export default async function CanvasScreen({
  canvasId,
  focusCardId,
  autoRun,
}: {
  canvasId?: string;
  focusCardId?: string;
  autoRun?: boolean;
}) {
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
        x: 0,
        y: 0,
        zoom: 1,
      }}
      focusCardId={focusCardId}
      autoRun={autoRun}
    />
  );
}