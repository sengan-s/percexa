import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API endpoints
app.post('/api/chat', async (req, res) => {
  try {
    const { messages = [], model = 'gemini-3.5-flash', roleType = 'architect' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please check the Secrets panel.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let systemInstruction = "You are the Executive AI Architect for PER CEXA, an ultra-premium technology company. Percexa specializes in software engineering, AI solutions, product design, cloud engineering, and technology consulting. Speak with restrained confidence, deep technical authority, and precision. Provide actionable architecture insights and help potential clients understand how Percexa builds what's next.";
    
    if (roleType === 'deep_reasoning') {
      systemInstruction = "You are the Deep Systems Reasoning Core for PER CEXA. You analyze complex architectural challenges, algorithmic complexity, distributed scale, AI governance, and high-performance computing with rigorous technical precision.";
    } else if (roleType === 'rapid_assistant') {
      systemInstruction = "You are the Instant Speed Assistant for PER CEXA. Provide ultra-concise, direct, high-value answers about Percexa's services, capabilities, tech stack, and project engagement process.";
    }

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const result = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    res.json({ text: result.text });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    res.status(500).json({
      error: err?.message || 'Failed to process request with Gemini.'
    });
  }
});

app.post('/api/contact', (req, res) => {
  try {
    const data = req.body;
    const refId = 'PCX-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    res.json({
      success: true,
      referenceId: refId,
      received: data,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid payload' });
  }
});

// Serve static assets in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Percexa server running on port ${port}`);
});
