import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.GEMINI_API_KEY,
});

function extractJson(text: string) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\[[\s\S]*\]/);

  if (!match) {
    console.error("❌ TEXTO COMPLETO GEMINI:\n", text);
    throw new Error("No se encontró JSON válido para preguntas");
  }

  try {
    return JSON.parse(match[0]);
  } catch (err) {
    console.error("❌ JSON INVALIDO:\n", match[0]);
    throw err;
  }
}

export async function generateFaqFromBlog(params: {
  excerpt: string;
  description: string;
  content: string;
}) {
  const { excerpt, description, content } = params;

  const prompt = `
Genera entre 5 y 10 preguntas con sus respectivas respuestas
basadas principalmente en el siguiente contenido técnico.

Prioriza el campo CONTENT como referencia principal.
Usa excerpt y description como apoyo contextual.

Contenido principal:
${content}

Resumen:
${excerpt}

Descripción SEO:
${description}

Las preguntas deben:
- Ser prácticas
- Estar enfocadas en minería artesanal y en pequeña y mediana minería
- Tener respuestas claras, directas y aplicables
- No usar lenguaje académico
- Tiene que tener un enfoque neutral y profesional osea no directamente del cliente hacia la empresa o viciversa, sino enfoque neutral.

Devuelve ÚNICAMENTE un JSON en formato ARRAY así:

[
  {
    "question": "",
    "answer": ""
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  if (!response.text) {
    throw new Error("Gemini no devolvió preguntas");
  }

  const faqArray = extractJson(response.text);

  if (!Array.isArray(faqArray)) {
    throw new Error("La IA no devolvió un array válido");
  }

  if (faqArray.length < 5) {
    throw new Error("La IA devolvió menos de 5 preguntas");
  }

  return faqArray.slice(0, 10); // Máximo 10
}
