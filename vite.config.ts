import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

function geminiServerPlugin(): Plugin {
  return {
    name: 'gemini-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { messages = [], model = 'gemini-3.5-flash', roleType = 'architect' } = data;

              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  error: 'GEMINI_API_KEY is not configured on the server. Please check the Secrets panel.'
                }));
                return;
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

              // Format conversation history for Gemini API
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

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ text: result.text }));
            } catch (err: any) {
              console.error('Gemini API Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                error: err?.message || 'Failed to process request with Gemini.'
              }));
            }
          });
          return;
        }

        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const refId = 'PCX-' + Math.random().toString(36).substring(2, 8).toUpperCase();
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                referenceId: refId,
                received: data,
                timestamp: new Date().toISOString()
              }));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid payload' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

