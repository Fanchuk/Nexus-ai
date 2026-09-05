import { uploadBytes } from "@/lib/uploadthing";

const RATIO_MAP: Record<string, { width: number; height: number }> = {
  "1:1":  { width: 1024, height: 1024 },
  "4:3":  { width: 1024, height: 768  },
  "16:9": { width: 1280, height: 720  },
  "9:16": { width: 720,  height: 1280 },
  "3:4":  { width: 768,  height: 1024 },
};

export async function createImage(prompt: string, style: string, ratio: string) {
  const { width, height } = RATIO_MAP[ratio] ?? RATIO_MAP["1:1"];
  const fullPrompt = `${prompt}, ${style} style`;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=${width}&height=${height}&nologo=true&enhance=true`;

  const response = await fetch(url);
  if (!response.ok) return null;

  const bytes = new Uint8Array(await response.arrayBuffer());
  return uploadBytes(bytes, "image/png");
}

export async function removeBackground(url: string) {
  const response = await fetch(url);
  if (!response.ok) return null;

  const bytes = new Uint8Array(await response.arrayBuffer());
  return uploadBytes(bytes, "image/png");
}