import { uploadBytes } from "@/lib/uploadthing";

export async function createImage(prompt: string, style: string, ratio: string) {
  const encoded = encodeURIComponent(`${prompt}. Style: ${style}. Aspect ratio ${ratio}.`);
  const seed = Math.floor(Math.random() * 1000000);
  
  const res = await fetch(
    `https://image.pollinations.ai/prompt/${encoded}?nologo=true&seed=${seed}&model=flux`,
  );
  
  if (!res.ok) return null;
  const bytes = new Uint8Array(await res.arrayBuffer());
  return uploadBytes(bytes, "image/png");
}

export async function removeBackground(url: string) {
  const form = new FormData();
  form.append("image_url", url);
  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": process.env.REMOVE_BG_API_KEY! },
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("remove.bg error:", res.status, text);
    return null;
  }

  const bytes = new Uint8Array(await res.arrayBuffer());
  return uploadBytes(bytes, "image/png");
}