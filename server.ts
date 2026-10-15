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

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Endpoint for UBP AI Assistant with Google Search Grounding
app.post('/api/assistant', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
      return res.status(400).json({ error: 'Escribí una consulta de hasta 2000 caracteres.' });
    }

    if (!ai) {
      return res.status(503).json({ error: 'El asistente IA no está configurado.' });
    }

    const systemInstruction = `Sos Pascalina, una ayuda experimental para una demostración de UBP Conecta. Respondé en español, de forma breve y clara. Las reservas, eventos y perfiles de la interfaz son datos de muestra: no confirmes acciones reales, disponibilidad, enlaces ni afiliaciones. Si no tenés datos suficientes, decilo y sugerí revisar el directorio o consultar a la universidad. Explicá por qué sugerís un perfil y recordá que la persona puede elegir otro. No inventes niveles de certeza, fuentes, fechas ni credenciales. No hagas afirmaciones de precisión garantizada. Evitá formato Markdown.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const reply = response.text?.trim();
    if (!reply) return res.status(502).json({ error: 'La IA no devolvió una respuesta.' });
    
    // Extract sources from grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((c: any) => c.web?.uri && c.web?.title)
      .map((c: any) => ({
        title: c.web.title,
        uri: c.web.uri,
      })).slice(0, 4);

    return res.json({
      reply,
      sources,
      mode: 'ai',
    });
  } catch (err: any) {
    console.error('Error in /api/assistant:', err);
    return res.status(503).json({ error: 'No se pudo completar la consulta con IA. Intentá de nuevo.' });
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
