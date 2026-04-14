import React from 'react';
import { LayoutDashboard, Users, MessageSquare, Palette, Settings, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';
import { UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appName: string;
  logoUrl: string;
  userRole: UserRole;
}

export default function Sidebar({ activeTab, setActiveTab, appName, logoUrl, userRole }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'secretaria', 'aluno', 'pais'] },
    { id: 'students', label: 'Alunos', icon: Users, roles: ['admin', 'secretaria', 'aluno', 'pais'] },
    { id: 'communication', label: 'Comunicação', icon: MessageSquare, roles: ['admin', 'secretaria', 'aluno', 'pais'] },
    { id: 'grades', label: 'Notas', icon: GraduationCap, roles: ['admin', 'secretaria', 'aluno', 'pais'] },
    { id: 'customizer', label: 'Customização', icon: Palette, roles: ['admin'] },
    { id: 'settings', label: 'Configurações', icon: Settings, roles: ['admin'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="w-64 bg-brand-secondary text-white h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <img 
          src={logoUrl} 
          alt="Logo" 
          className="w-10 h-10 rounded-brand object-cover"
          referrerPolicy="no-referrer"
        />
        <span className="font-bold text-xl truncate">{appName}</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-brand transition-all duration-200",
              activeTab === item.id 
                ? "bg-brand-primary text-white shadow-lg" 
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-brand bg-white/5">
          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center font-bold uppercase">
            {userRole.substring(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate capitalize">{userRole}</p>
            <p className="text-xs text-slate-400 truncate">{userRole}@escola.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
