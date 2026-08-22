"use client";

import Image from "next/image";
import { NodeProps } from "@xyflow/react";
import { ImageIcon } from "lucide-react";
import NodeShell from "./NodeShell";
import { CardNode } from "./types";

export default function ImageNode({ data }: NodeProps<CardNode>) {
  const { card } = data;
  const url = card.data.urls?.[0];

  return (
    <NodeShell card={card}>
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-magenta/25 via-iris/20 to-cobalt/25">
        {url ? (
          <Image src={url} alt={card.prompt} fill className="object-cover" sizes="300px" />
        ) : (
          <ImageIcon className="size-10 text-magenta/70" />
        )}
      </div>
    </NodeShell>
  );
}