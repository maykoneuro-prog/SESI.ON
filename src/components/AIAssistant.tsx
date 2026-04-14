import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Olá! Sou seu assistente inteligente do SESI.ON. Como posso ajudar com a gestão escolar hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Lazy initialize AI to prevent crash if key is missing
  const ai = useMemo(() => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return null;
      return new GoogleGenAI({ apiKey });
    } catch (e) {
      console.warn("AI initialization failed:", e);
      return null;
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!ai) {
      setMessages(prev => [...prev, { role: 'ai', content: "O assistente AI não está configurado corretamente (chave de API ausente)." }]);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = ai.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Você é um assistente especializado em gestão escolar para a plataforma SESI.ON. Ajude diretores e professores com dúvidas sobre frequência, notas, comunicação com pais e organização pedagógica. Seja profissional, prestativo e conciso.",
      });

      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const aiResponse = response.text() || "Desculpe, não consegui processar sua solicitação.";
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Houve um erro ao processar sua pergunta. Por favor, verifique se a chave de API foi configurada corretamente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-brand-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        <Sparkles className={cn("transition-all", isOpen ? "rotate-90" : "")} />
        <span className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1 rounded-brand text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Assistente AI
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-white rounded-brand shadow-2xl border border-slate-200 flex flex-col z-50 animate-in slide-in-from-bottom-8 duration-300">
          <div className="p-4 bg-brand-primary text-white rounded-t-brand flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">EduConnect AI</span>
            </div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === 'user' ? "bg-slate-100 text-slate-600" : "bg-brand-primary/10 text-brand-primary"
                )}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={cn(
                  "p-3 rounded-brand text-sm",
                  msg.role === 'user' ? "bg-brand-primary text-white" : "bg-slate-100 text-slate-800"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin" />
                </div>
                <div className="bg-slate-100 p-3 rounded-brand">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte algo..."
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-brand text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-brand-primary text-white rounded-brand hover:opacity-90 disabled:opacity-50 transition-all"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
