import { UTApi } from "uploadthing/server";
import { nanoid } from "nanoid";

export const utapi = new UTApi();

export async function uploadBytes(bytes: Uint8Array, mime: string) {
  const name = `${nanoid()}.${mime.split("/")[1] ?? "png"}`;
  const file = new File([bytes as BlobPart], name, { type: mime });
  const result = await utapi.uploadFiles(file);

  if (!result.data) return null;

  return {
    name,
    key: result.data.key,
    url: result.data.ufsUrl ?? result.data.url,
    size: result.data.size,
    mime,
  };
}