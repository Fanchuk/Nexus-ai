export async function apiError(res: Response) {
  const json = await res.json().catch(() => null);
  return json?.error ?? "Something went wrong";
}