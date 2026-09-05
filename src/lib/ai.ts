import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const TEXT_MODELS: Record<string, string> = {
  fast:     "gemini-2.0-flash-lite",
  balanced: "gemini-2.0-flash",
  deep:     "gemini-2.5-pro",
};

export const textModel = google(TEXT_MODELS.balanced);

export const getTextModel = (name?: string | null) =>
  google(TEXT_MODELS[name ?? "balanced"] ?? TEXT_MODELS.balanced);

export const imageModel = google("gemini-3-pro-image");

export const embeddingModel = google.textEmbeddingModel("text-embedding-004");

export const imageProviderOptions = {
  google: { responseModalities: ["TEXT", "IMAGE"] },
};