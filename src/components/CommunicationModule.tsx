import React, { useState } from 'react';
import { Send, Users, Filter, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CommunicationModule() {
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState({
    segment: '',
    grade: '',
    class: '',
    period: '',
    gender: '',
    target: 'students' // students or parents
  });
  const [message, setMessage] = useState({
    title: '',
    content: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const segments = ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'];
  const grades = ['1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano', '6º Ano', '7º Ano', '8º Ano', '9º Ano'];
  const classes = ['A', 'B', 'C', 'D'];
  const periods = ['Manhã', 'Tarde', 'Noite'];
  const genders = ['Todos', 'Masculino', 'Feminino'];

  const handleSend = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 2000);
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Mensagem Enviada!</h2>
        <p className="text-slate-500 mt-2 text-center max-w-md">
          Sua comunicação foi processada e enviada para os destinatários selecionados conforme os filtros aplicados.
        </p>
        <button 
          onClick={() => { setIsSent(false); setStep(1); setMessage({ title: '', content: '' }); }}
          className="mt-8 px-6 py-2 bg-brand-primary text-white rounded-brand font-bold"
        >
          Nova Mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Central de Comunicação</h2>
        <p className="text-slate-500 mt-1">Envie comunicados segmentados para alunos e responsáveis.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Filters Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-brand shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-6">
              <Filter size={20} className="text-brand-primary" />
              <h3>Filtros de Destinatários</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Público Alvo</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setFilters({...filters, target: 'students'})}
                    className={cn(
                      "py-2 px-3 text-sm rounded-brand border transition-all",
                      filters.target === 'students' ? "bg-brand-primary/10 border-brand-primary text-brand-primary font-bold" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    Alunos
                  </button>
                  <button 
                    onClick={() => setFilters({...filters, target: 'parents'})}
                    className={cn(
                      "py-2 px-3 text-sm rounded-brand border transition-all",
                      filters.target === 'parents' ? "bg-brand-primary/10 border-brand-primary text-brand-primary font-bold" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    Pais/Responsáveis
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Segmento</label>
                <select 
                  className="w-full p-2 border border-slate-200 rounded-brand text-sm outline-none focus:ring-2 focus:ring-brand-primary/20"
                  value={filters.segment}
                  onChange={(e) => setFilters({...filters, segment: e.target.value})}
                >
                  <option value="">Todos os Segmentos</option>
                  {segments.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Série</label>
                  <select 
                    className="w-full p-2 border border-slate-200 rounded-brand text-sm outline-none"
                    value={filters.grade}
                    onChange={(e) => setFilters({...filters, grade: e.target.value})}
                  >
                    <option value="">Todas</option>
                    {grades.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Turma</label>
                  <select 
                    className="w-full p-2 border border-slate-200 rounded-brand text-sm outline-none"
                    value={filters.class}
                    onChange={(e) => setFilters({...filters, class: e.target.value})}
                  >
                    <option value="">Todas</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Período</label>
                  <select 
                    className="w-full p-2 border border-slate-200 rounded-brand text-sm outline-none"
                    value={filters.period}
                    onChange={(e) => setFilters({...filters, period: e.target.value})}
                  >
                    <option value="">Todos</option>
                    {periods.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gênero</label>
                  <select 
                    className="w-full p-2 border border-slate-200 rounded-brand text-sm outline-none"
                    value={filters.gender}
                    onChange={(e) => setFilters({...filters, gender: e.target.value})}
                  >
                    {genders.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-brand border border-dashed border-slate-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span>ESTIMATIVA DE ALCANCE</span>
                <Users size={14} />
              </div>
              <p className="text-2xl font-bold text-slate-900">428 <span className="text-sm font-normal text-slate-500">pessoas</span></p>
            </div>
          </div>
        </div>

        {/* Message Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-brand shadow-sm border border-slate-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 text-lg">Compor Mensagem</h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded uppercase">Rascunho</span>
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Título do Comunicado</label>
                <input 
                  type="text" 
                  placeholder="Ex: Reunião de Pais - 2º Bimestre"
                  className="w-full px-4 py-3 border border-slate-200 rounded-brand focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  value={message.title}
                  onChange={(e) => setMessage({...message, title: e.target.value})}
                />
              </div>

              <div className="flex-1 flex flex-col min-h-[300px]">
                <label className="block text-sm font-medium text-slate-700 mb-2">Conteúdo da Mensagem</label>
                <textarea 
                  placeholder="Digite aqui o comunicado oficial..."
                  className="flex-1 w-full px-4 py-4 border border-slate-200 rounded-brand focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none"
                  value={message.content}
                  onChange={(e) => setMessage({...message, content: e.target.value})}
                ></textarea>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-100 rounded-brand flex gap-3">
                <AlertCircle className="text-amber-600 shrink-0" size={20} />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Esta mensagem será enviada via Notificação Push no App e E-mail para todos os usuários que atendem aos critérios de filtro selecionados ao lado.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-50 rounded-brand transition-colors">
                Cancelar
              </button>
              <button 
                onClick={handleSend}
                disabled={!message.title || !message.content || isSending}
                className="px-8 py-2 bg-brand-primary text-white rounded-brand font-bold shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                <span>{isSending ? 'Enviando...' : 'Enviar Comunicado'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loader2({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      className={cn("animate-spin", className)} 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
