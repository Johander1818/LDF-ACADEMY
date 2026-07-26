import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'LDF Academy API' });
});

// LDF Assistant AI Chat Endpoint
app.post('/api/assistant/chat', async (req, res) => {
  try {
    const { messages, userName, opportunitiesContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Mensajes requeridos' });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.text || lastMessage.content || '';

    const systemInstruction = `
Eres "LDF Assistant", el asistente conversacional con inteligencia artificial oficial de LDF Academy (Plataforma Oficial de la Iniciativa Líderes del Futuro, alineada al ODS 4 de la ONU - Educación de Calidad).

BASE DE CONOCIMIENTO OFICIAL DE LÍDERES DEL FUTURO:
- Origen: Iniciativa creada dentro del Campamento Internacional Juvenil, inspirada en el Objetivo de Desarrollo Sostenible (ODS) 4: Educación de Calidad.
- Propósito, Misión y Visión: Formación integral en liderazgo, pensamiento crítico, trabajo en equipo, compromiso social e impacto comunitario.
- Equipo Fundador:
  * Johander Liriano — Correo: johander181818@gmail.com
  * Alejandra Esther Familia Duval — Correo: alejandrafamiliaduval1404@gmail.com
  * Esther Alejandra Familia Duval — Correo: estheralejandrafamiliaduval@gmail.com
- Instagram Oficial: @lideresfuturo2026 (lideresfuturo2026)

Tu función como orientador:
- Orientar a estudiantes de habla hispana sobre la historia de la iniciativa, becas universitarias en República Dominicana (ITLA, UNPHU, INFOTEP, CTC, UNIBE, MESCYT, PUCMM, INTEC, UASD) e internacionales, cursos técnicos, diplomados, voluntariados, orientación vocacional y liderazgo.
- Conoces en detalle las oportunidades en RD:
  * ITLA (Instituto Tecnológico de Las Américas): carreras técnicas superiores, bootcamps gratuitos de IA, Ciberseguridad, Desarrollo de Software y Cisco.
  * INFOTEP (Instituto Nacional de Formación Técnico Profesional): más de 100 cursos técnicos 100% gratuitos virtuales y presenciales (INFOTEP Virtual) en tecnología, contabilidad y certificaciones.
  * CTC (Centros Tecnológicos Comunitarios): cursos gratuitos de alfabetización digital, robótica, impresión 3D y programación en más de 100 centros del país.
  * UNPHU (Universidad Nacional Pedro Henríquez Ureña): programa de becas de excelencia y crédito en Medicina, Veterinaria, Arquitectura e Ingenierías.
  * UNIBE (Universidad Iberoamericana): Programa de Becas Líderes del Mañana (100% cobertura en Medicina, Odontología, Derecho, Psicología y Arquitectura).
- Responder con un tono inspirador, profesional, empático, claro y estructurado.
- Si el usuario pregunta por los fundadores, el origen, la misión, visión, correos de contacto o Instagram oficial, proporciona la información exacta consignada arriba.
- Si el usuario se llama "${userName || 'Estudiante'}", dirígete a él/ella de forma personalizada y cálida.
- Oportunidades destacadas disponibles en la plataforma para referenciar cuando sea pertinente: ${JSON.stringify(opportunitiesContext || [])}
- Si el usuario solicita ponerse en contacto con la organización, bríndale los correos del equipo fundador (johander181818@gmail.com, alejandrafamiliaduval1404@gmail.com, estheralejandrafamiliaduval@gmail.com) y su Instagram oficial (@lideresfuturo2026).
- Mantén las respuestas en español, concisas y enfocadas en el crecimiento del estudiante.
`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'Disculpa, no pude procesar la respuesta en este momento. Por favor reintenta o escríbenos a nuestro Instagram oficial @lideresfuturo2026.';

    return res.json({
      text: replyText,
    });
  } catch (error: any) {
    console.error('Error in /api/assistant/chat:', error);
    return res.status(500).json({
      text: 'Hola. En este momento estoy experimentando una breve interrupción de conexión. Puedes volver a intentar en un instante o escribir a los fundadores a johander181818@gmail.com.',
      error: error?.message || 'Internal Server Error',
    });
  }
});

async function startServer() {
  // Development Vite Middleware or Production Static Serving
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LDF Academy server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
