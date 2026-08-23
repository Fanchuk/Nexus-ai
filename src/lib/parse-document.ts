import mammoth from "mammoth";

const pdf = require("pdf-parse") as (buffer: Buffer) => Promise<{ numpages: number; text: string }>;

const CHUNK = 2500;

function chunk(text: string) {
  const pages: string[] = [];
  for (let index = 0; index < text.length; index += CHUNK) {
    pages.push(text.slice(index, index + CHUNK));
  }
  return pages.length ? pages : [""];
}

export async function parseDocument(url: string, mime: string) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());

  if (mime === "application/pdf") {
    const result = await pdf(buffer);
    return chunk(result.text);
  }

  if (mime.includes("word")) {
    const { value } = await mammoth.extractRawText({ buffer });
    return chunk(value);
  }

  return chunk(buffer.toString("utf8"));
}

export function getReadTime(pages: string[]) {
  const words = pages.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}