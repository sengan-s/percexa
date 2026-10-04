import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, Trash2, Cpu, Zap, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { ChatMessage, GeminiModelType, AIConsultantRole } from '../types';
import { sound } from '../utils/sound';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        'Welcome to PER CEXA Systems Consultation. I am your specialized AI Intelligence Core. How can we assist in architecting your next-generation software, AI system, or infrastructure today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AIConsultantRole>('architect');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Map role to Gemini model
  const roleConfig: Record<
    AIConsultantRole,
    { name: string; model: GeminiModelType; badge: string; desc: string; icon: any }
  > = {
    architect: {
      name: 'Executive AI Architect',
      model: 'gemini-3.5-flash',
      badge: 'gemini-3.5-flash',
      desc: 'System architecture, product roadmaps & general advisory',
      icon: Cpu,
    },
    deep_reasoning: {
      name: 'Deep Systems Reasoning',
      model: 'gemini-3.1-pro-preview',
      badge: 'gemini-3.1-pro-preview',
      desc: 'High-complexity math, algorithmic audits & scale invariants',
      icon: ShieldAlert,
    },
    rapid_assistant: {
      name: 'Instant Speed Assistant',
      model: 'gemini-3.1-flash-lite',
      badge: 'gemini-3.1-flash-lite',
      desc: 'Ultra-low latency instant inquiries & tech stack specs',
      icon: Zap,
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || loading) return;

    sound.playClick();

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const activeConfig = roleConfig[selectedRole];
      const payload = {
        messages: newHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        model: activeConfig.model,
        roleType: selectedRole,
      };

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Server returned an error.');
      }

      const botMessage: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'model',
        content: data.text || 'Response received from Percexa Core.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: activeConfig.model,
      };

      setMessages((prev) => [...prev, botMessage]);
      sound.playFocus();
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'model',
        content: `Diagnostic: ${err.message || 'Unable to connect to Percexa AI API. Ensure GEMINI_API_KEY is configured in Secrets.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: roleConfig[selectedRole].model,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    sound.playClick();
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: 'Session state cleared. All conversation invariants reset. How may PER CEXA assist your team?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: roleConfig[selectedRole].model,
      },
    ]);
  };

  const samplePrompts = [
    'How does Percexa engineer real-time AI inference at scale?',
    'What is your architectural approach to enterprise zero-trust AI?',
    'Explain the tech stack for scalable cloud native pipelines.',
    'I want to build a custom computer vision and robotics monitoring platform.',
  ];

  if (!isOpen) return null;

  const currentRole = roleConfig[selectedRole];
  const IconComp = currentRole.icon;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-all duration-300">
      <div
        className="w-full max-w-xl h-full bg-[#080808] border-l border-neutral-800 flex flex-col shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-label="PER CEXA AI Lab Console"
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-[#050505] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center text-white">
              <IconComp className="w-4 h-4 text-neutral-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-semibold tracking-wide text-white uppercase">
                  Percexa Intelligence
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-neutral-800 text-neutral-400 bg-neutral-950">
                  {currentRole.badge}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-sans">{currentRole.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              title="Clear Session History"
              className="p-1.5 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role & Model Selector Tabs */}
        <div className="p-3 border-b border-neutral-800/80 bg-[#080808] flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          {(Object.keys(roleConfig) as AIConsultantRole[]).map((key) => {
            const item = roleConfig[key];
            const isActive = selectedRole === key;
            return (
              <button
                key={key}
                onClick={() => {
                  sound.playHover();
                  setSelectedRole(key);
                }}
                className={`px-3 py-1.5 rounded transition-all whitespace-nowrap text-left border flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-600 shadow-sm'
                    : 'bg-transparent text-neutral-400 border-neutral-800/60 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-neutral-600'}`} />
                <span className="font-medium">{item.name.split(' ')[0]}</span>
                <span className="font-mono text-[9px] text-neutral-500 hidden sm:inline">
                  {key === 'deep_reasoning' ? '3.1 Pro' : key === 'rapid_assistant' ? '3.1 Lite' : '3.5 Flash'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0 text-neutral-300 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[84%] rounded p-3.5 border leading-relaxed ${
                    isUser
                      ? 'bg-neutral-900 border-neutral-700 text-[#F5F5F5]'
                      : 'bg-[#0e0e0e] border-neutral-800 text-neutral-200'
                  }`}
                >
                  <div className="text-[13px] whitespace-pre-wrap selection:bg-neutral-700">
                    {m.content}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1 border-t border-white/5">
                    <span>{m.timestamp}</span>
                    {m.modelUsed && <span>{m.modelUsed}</span>}
                  </div>
                </div>
                {isUser && (
                  <div className="w-7 h-7 rounded border border-neutral-700 bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-300 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0 text-neutral-300 animate-pulse">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="p-3.5 rounded border border-neutral-800 bg-[#0e0e0e] text-neutral-400 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-400 animate-ping" />
                Synthesizing response via {currentRole.badge}...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t border-neutral-900 bg-[#050505] flex gap-2 overflow-x-auto text-[11px]">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-2.5 py-1 rounded border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1 shrink-0"
              >
                <span>{p.slice(0, 34)}...</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-neutral-800 bg-[#060606] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${currentRole.name}...`}
              className="flex-1 bg-[#121212] border border-neutral-800 rounded px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 bg-neutral-100 text-black hover:bg-white disabled:opacity-30 disabled:pointer-events-none rounded font-medium text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Transmit</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="mt-2 text-center">
            <span className="text-[10px] text-neutral-600 font-mono tracking-wider uppercase">
              CONFIDENTIAL // MULTI-TURN PER CEXA AI LAB ENVIRONMENT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
