import React from 'react';
import { LayoutDashboard, Users, MessageSquare, Palette, Settings, GraduationCap, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appName: string;
  logoUrl: string;
  userRole: UserRole;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, appName, logoUrl, userRole, isOpen, setIsOpen }: SidebarProps) {
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
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "w-64 bg-brand-secondary text-white h-screen flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-brand object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-lg md:text-xl truncate">{appName}</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
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
    </>
  );
}
