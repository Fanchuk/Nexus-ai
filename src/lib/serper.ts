export type WebSource = { title: string; link: string; domain: string; snippet: string };

export async function searchWeb(query: string): Promise<WebSource[]> {
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
  const organic = Array.isArray(json.organic) ? json.organic : [];

  return organic.slice(0, 5).map((item: { title: string; link: string; snippet?: string }) => ({
    title: item.title,
    link: item.link,
    domain: new URL(item.link).hostname.replace("www.", ""),
    snippet: item.snippet ?? "",
  }));
}