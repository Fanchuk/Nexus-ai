import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const TEXT_MODELS: Record<string, string> = {
  fast: "gemini-1.5-flash-8b",
  balanced: "gemini-1.5-flash",
  deep: "gemini-1.5-pro",
};

export const textModel = google(TEXT_MODELS.balanced);

export const getTextModel = (name?: string | null) =>
  google(TEXT_MODELS[name ?? "balanced"] ?? TEXT_MODELS.balanced);

export const imageModel = google("gemini-2.0-flash-preview-image-generation");

export const embeddingModel = google.textEmbeddingModel("gemini-embedding-001");

export const imageProviderOptions = {
  google: { responseModalities: ["TEXT", "IMAGE"] },
};