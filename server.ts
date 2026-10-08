import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI on the server side
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint for UBP AI Assistant with Google Search Grounding
app.post('/api/assistant', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!apiKey) {
      // Friendly fallback if key not configured
      return res.json({
        reply: `Como asistente oficial de UBP Conecta, te informo que podés consultar la agenda de eventos, anotarte al Torneo de Fútbol Alumnos vs. Egresados en el Campus de Argüello (Donato Álvarez 3800), solicitar mentorías con graduados destacados como Juan Chacón (Machinalis/MELI) o Carlos Ciravegna, y consultar convenios deportivos de Pádel y clubes de Córdoba.`,
        sources: [],
      });
    }

    const systemInstruction = `Sos el asistente inteligente oficial de la plataforma "UBP Conecta" de la Universidad Blas Pascal (UBP), ubicada en Av. Donato Álvarez 3800, Argüello, Córdoba, Argentina.
Tu lema es "Saber y Saber Hacer".
Ayudás a alumnos y egresados a:
1. Encontrar graduados destacados (ej. Juan Chacón de Machinalis/Mercado Libre, Carlos Ciravegna en arquitectura, Nazarena Bulacios premio COPIME, Dr. Juan Mundel en DePaul Chicago, etc.).
2. Informar sobre las mentorías "Book With Me" y el Centro de Graduados/as.
3. Brindar detalles sobre actividades deportivas: el Torneo Copa Blas Pascal (fútbol 7 y 11), convenios de pádel gratuito, alianzas con Belgrano y Talleres, ajedrez y el proyecto internacional SEMASC.
4. Información sobre doingLABS (la incubadora UBP) y Córdoba Management School (CMS).
5. Podés usar Google Search para buscar información verídica y actualizada sobre la Universidad Blas Pascal.
Respondé con calidez universitaria cordobesa pero profesional, de forma concisa y útil en español.`;

    // Call Gemini 3.5 Flash with Google Search tool
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: message,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const reply = response.text || 'No pude generar una respuesta en este momento.';
    
    // Extract sources from grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((c: any) => c.web?.uri && c.web?.title)
      .map((c: any) => ({
        title: c.web.title,
        uri: c.web.uri,
      }));

    return res.json({
      reply,
      sources,
    });
  } catch (err: any) {
    console.error('Error in /api/assistant:', err);
    return res.status(500).json({
      error: 'Error al procesar la consulta con el asistente de IA.',
      details: err.message,
    });
  }
});

// Setup Vite middlewares for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
