export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  metric: string;
  metricLabel: string;
  category: string;
  tags: string[];
  techStack: string[];
  challenge: string;
  solution: string;
  architecture: string[];
  client: string;
  year: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  objectType: 'cube' | 'neural' | 'torus' | 'cloud' | 'crystal';
  deliverables: string[];
  specifications: string[];
  useCases: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

export type GeminiModelType = 'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite';

export type AIConsultantRole = 'architect' | 'deep_reasoning' | 'rapid_assistant';
