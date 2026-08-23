import { generateText } from "ai";
import { imageModel, imageOptions } from "@/lib/ai";
import { uploadBytes } from "@/lib/uploadthing";

type Part = { type: "text"; text: string } | { type: "image"; image: Uint8Array };

async function run(content: Part[]) {
  const result = await generateText({
    model: imageModel,
    messages: [{ role: "user", content }],
    providerOptions: imageOptions,
  });

  const file = result.files.find((item) => item.mediaType?.startsWith("image/"));
  if (!file) return null;

  return uploadBytes(file.uint8Array, file.mediaType);
}

export function createImage(prompt: string, style: string, ratio: string) {
  return run([{ type: "text", text: `${prompt}. Style: ${style}. Aspect ratio ${ratio}.` }]);
}

export async function removeBackground(url: string) {
    const buffer = await fetch(url).then((res) => res.arrayBuffer());
    const bytes = new Uint8Array(buffer);

  return run([
    {
      type: "text",
      text: "Remove the background completely. Keep the subject sharp and centered on a plain white background.",
    },
    { type: "image", image: bytes },
  ]);
}