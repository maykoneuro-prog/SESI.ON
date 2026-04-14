import React from 'react';
import { Users, GraduationCap, Calendar, TrendingUp, AlertCircle, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const stats = [
    { label: 'Total de Alunos', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Média Geral', value: '8.4', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Frequência', value: '94%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Eventos no Mês', value: '12', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentActivities = [
    { id: 1, type: 'grade', user: 'Ana Silva', detail: 'Nova nota postada em Matemática', time: '10 min atrás', status: 'success' },
    { id: 2, type: 'absence', user: 'Carlos Oliveira', detail: 'Falta registrada (3º tempo)', time: '45 min atrás', status: 'warning' },
    { id: 3, type: 'message', user: 'Prof. Marcos', detail: 'Enviou comunicado para 8º Ano B', time: '2 horas atrás', status: 'info' },
    { id: 4, type: 'event', user: 'Secretaria', detail: 'Reunião de pais agendada', time: '5 horas atrás', status: 'info' },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Bem-vindo, Admin</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">Aqui está o que está acontecendo na sua escola hoje.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-brand shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className={cn("p-2 md:p-3 rounded-brand", stat.bg)}>
                <stat.icon className={stat.color} size={20} />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+2.5%</span>
            </div>
            <p className="text-slate-500 text-xs md:text-sm font-medium">{stat.label}</p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-brand shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Atividade Recente</h3>
            <button className="text-brand-primary text-sm font-bold hover:underline">Ver tudo</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                <div className={cn(
                  "p-2 rounded-full",
                  activity.status === 'success' ? "bg-emerald-100 text-emerald-600" :
                  activity.status === 'warning' ? "bg-amber-100 text-amber-600" :
                  "bg-blue-100 text-blue-600"
                )}>
                  {activity.status === 'success' ? <CheckCircle2 size={18} /> :
                   activity.status === 'warning' ? <AlertCircle size={18} /> :
                   <Clock size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">
                    <span className="font-bold">{activity.user}</span> {activity.detail}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-brand-primary p-6 rounded-brand text-white shadow-lg shadow-brand-primary/20">
            <h3 className="font-bold text-lg mb-2">Ações Rápidas</h3>
            <p className="text-white/80 text-sm mb-6">Gerencie as tarefas mais comuns com um clique.</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white/10 hover:bg-white/20 p-3 rounded-brand text-sm font-bold transition-colors flex flex-col items-center gap-2">
                <Users size={20} />
                Novo Aluno
              </button>
              <button className="bg-white/10 hover:bg-white/20 p-3 rounded-brand text-sm font-bold transition-colors flex flex-col items-center gap-2">
                <MessageSquare size={20} />
                Comunicado
              </button>
              <button className="bg-white/10 hover:bg-white/20 p-3 rounded-brand text-sm font-bold transition-colors flex flex-col items-center gap-2">
                <GraduationCap size={20} />
                Lançar Notas
              </button>
              <button className="bg-white/10 hover:bg-white/20 p-3 rounded-brand text-sm font-bold transition-colors flex flex-col items-center gap-2">
                <Calendar size={20} />
                Evento
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-brand shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Próximos Eventos</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-brand flex flex-col items-center justify-center text-slate-600">
                  <span className="text-xs font-bold uppercase">Abr</span>
                  <span className="text-lg font-bold leading-none">15</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Reunião Pedagógica</p>
                  <p className="text-xs text-slate-500">08:00 - Auditório</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-brand flex flex-col items-center justify-center text-slate-600">
                  <span className="text-xs font-bold uppercase">Abr</span>
                  <span className="text-lg font-bold leading-none">18</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Feira de Ciências</p>
                  <p className="text-xs text-slate-500">Todo o dia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
