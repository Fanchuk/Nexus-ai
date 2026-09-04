import { generateText } from "ai";
import { imageModel, imageProviderOptions } from "@/lib/ai";
import { uploadBytes } from "@/lib/uploadthing";

type File = { mediaType: string; uint8Array: Uint8Array };

function pickImage(files: File[] | undefined) {
  return files?.find((file) => file.mediaType?.startsWith("image/")) ?? null;
}

export async function createImage(prompt: string, style: string, ratio: string) {
  const result = await generateText({
    model: imageModel,
    providerOptions: imageProviderOptions,
    prompt: `${prompt}. Style: ${style}. Aspect ratio ${ratio}.`,
  });

  const image = pickImage(result.files as File[]);
  if (!image) return null;

  return uploadBytes(image.uint8Array, image.mediaType);
}

export async function removeBackground(url: string) {
  const response = await fetch(url);
  if (!response.ok) return null;

  const bytes = new Uint8Array(await response.arrayBuffer());

  const result = await generateText({
    model: imageModel,
    providerOptions: imageProviderOptions,
    messages: [
      {
        role: "user",
        content: [
          { type: "image", image: bytes, mediaType: "image/png" },
          { type: "text", text: "Remove the background. Keep the subject on transparent background." },
        ],
      },
    ],
  });

  const image = pickImage(result.files as File[]);
  if (!image) return null;

  return uploadBytes(image.uint8Array, image.mediaType);
}