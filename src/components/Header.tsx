import React from 'react';
import { Bell, Search, HelpCircle, LogOut, User as UserIcon, Menu } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  toggleSidebar: () => void;
}

export default function Header({ user, onLogout, toggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-brand transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="flex-1 max-w-xl hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-brand focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
          <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
            <UserIcon size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700 leading-none">{user.name}</span>
            <span className="text-[10px] text-slate-400 leading-none mt-1 uppercase">{user.role}</span>
          </div>
        </div>

        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="hidden sm:block p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <HelpCircle size={20} />
        </button>
        <div className="h-8 w-px bg-slate-200 mx-1 md:mx-2"></div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors font-medium text-sm p-2"
        >
          <LogOut size={18} />
          <span className="hidden lg:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
