import { GoogleGenAI } from "@google/genai";
import type { Blog } from "@prisma/client";
import { prisma } from "../../../lib/db.server";
import { generateFaqFromBlog } from "./autoCreateQuestion";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.GEMINI_API_KEY,
});

function extractJson(text: string) {
  // 1. Eliminar bloques ```json y ```
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // 2. Extraer el primer objeto JSON válido
  const match = cleaned.match(/\{[\s\S]*\}/);

  if (!match) {
    console.error("❌ TEXTO COMPLETO GEMINI:\n", text);
    throw new Error("No se encontró JSON válido en la respuesta de Gemini");
  }

  try {
    return JSON.parse(match[0]);
  } catch (err) {
    console.error("❌ JSON INVALIDO:\n", match[0]);
    throw err;
  }
}

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function autoCreateBlog(serviceId: number): Promise<Blog> {
  if (!serviceId) {
    throw new Error("serviceId requerido");
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { subtitles: true },
  });

  if (!service) {
    throw new Error("Service no existe");
  }

  const slug = createSlug(service.title);

  console.log("GEMINI_API_KEY:", import.meta.env.GEMINI_API_KEY);

  const prompt = `
Eres un redactor técnico especializado en minería artesanal,
pequeña y mediana minería en Perú y Latinoamérica(no mensionarlo pero tenerlo solo como referencia).

El artículo debe estar dirigido a:
- Mineros artesanales
- Pequeños y medianos empresarios mineros
- Operadores de plantas metalúrgicas
- Personas con experiencia práctica académica

Usa un lenguaje:
- Humano, claro y directo
- Explicativo y práctico
- Fácil de entender
- SIN lenguaje académico
- SIN términos universitarios
- SIN exceso de teoría química

Servicio principal:
"${service.title}"

Procesos o subservicios relacionados:
${service.subtitles.map((s, i) => `${i + 1}. ${s.text}`).join("\n")}

El contenido debe enfocarse en:
- Fabricación de equipos metalúrgicos
- Plantas de lixiviación, absorción, desorción y agitación
- Chancadoras, molinos y equipos similares
- Beneficios reales en recuperación de minerales
- Aplicaciones prácticas en planta o campo

Genera lo siguiente:

1. **Excerpt**
   - Resumen corto (máx 3 líneas)
   - Enfocado en beneficios prácticos

2. **Descripción SEO**
   - Optimizada para Google
   - Servicios metalúrgicos para minería artesanal
   - Respetar comas, puntos y signos de puntuación correctamente
   - Longitud aproximada de doscientos cincuenta a trescientos cincuenta caracteres
   - Enfocado en posicionamiento SEO comercial

3. **Contenido largo**
   - Explicaciones simples
   - Ejemplos reales
   - Lenguaje de cliente minero
   - Solo texto, profesional, listo para blog
   - Sin teoría innecesaria
   - SOLO TEXTO, SIN NÚMEROS, SIN SÍMBOLOS, PROFESIONAL, CON PÁRRAFOS
   - Longitud aproximada de mil a mil quinientos caracteres
   - En todo el contenido, no más de cuatro a seis oraciones seguidas antes de iniciar un nuevo párrafo o idea
   - Respetar comas, puntos y signos de puntuación correctamente

Devuelve ÚNICAMENTE un JSON con esta estructura exacta:

{
  "excerpt": "",
  "description": "",
  "content": ""
}
`;

  const geminiResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const rawText = geminiResponse.text;

  if (!rawText) {
    throw new Error("Gemini no devolvió contenido");
  }

  const aiResult = extractJson(rawText);

  if (
    typeof aiResult.excerpt !== "string" ||
    typeof aiResult.description !== "string" ||
    typeof aiResult.content !== "string"
  ) {
    throw new Error("Estructura JSON inválida devuelta por Gemini");
  }

  // 1️⃣ Crear el blog primero
  const blog = await prisma.blog.create({
    data: {
      slug,
      excerpt: aiResult.excerpt,
      description: aiResult.description,
      content: aiResult.content,
      published: true,
      publishedAt: new Date(),
      serviceId: service.id,
    },
  });

  // 2️⃣ Generar las preguntas con IA
  const faq = await generateFaqFromBlog({
    excerpt: aiResult.excerpt,
    description: aiResult.description,
    content: aiResult.content,
  });

  // 3️⃣ Insertar las preguntas en la base de datos
  await prisma.question.createMany({
    data: faq.map((item: any) => ({
      question: item.question,
      answer: item.answer,
      blogId: blog.id,
    })),
  });

  return blog;
}
