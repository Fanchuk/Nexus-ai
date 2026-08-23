import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
});

export const textModel = google("gemini-3.6-flash");
export const imageModel = google("gemini-3.1-flash-image-preview");
export const imageOptions = {
  google: { responseModalities: ["TEXT", "IMAGE"] },
};