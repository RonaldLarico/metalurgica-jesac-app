import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.GEMINI_API_KEY,
});

async function test() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Responde solo con OK",
  });

  console.log(response.text);
}

test();
