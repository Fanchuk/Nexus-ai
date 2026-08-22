import { prisma, toJson } from "@/lib/prisma";

export type WebSource = { title: string; link: string; domain: string; snippet: string };

const HOUR = 60 * 60 * 1000;

export async function searchWeb(query: string): Promise<WebSource[]> {
  const key = query.trim().toLowerCase();
  const cached = await prisma.searchCache.findUnique({ where: { query: key } });

  if (cached && cached.createdAt.getTime() > Date.now() - HOUR) {
    return cached.results as unknown as WebSource[];
  }

  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query, num: 5 }),
  });

  if (!res.ok) return [];

  const json = await res.json();
  const organic: { title: string; link: string; snippet?: string }[] = json.organic ?? [];

  const results = organic.slice(0, 5).map((item) => ({
    title: item.title,
    link: item.link,
    domain: new URL(item.link).hostname.replace("www.", ""),
    snippet: item.snippet ?? "",
  }));

  await prisma.searchCache.upsert({
    where: { query: key },
    update: { results: toJson(results), createdAt: new Date() },
    create: { query: key, results: toJson(results) },
  });

  return results;
}