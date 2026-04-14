/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Customizer from './components/Customizer';
import CommunicationModule from './components/CommunicationModule';
import AIAssistant from './components/AIAssistant';
import Login from './components/Login';
import { AppTheme, DEFAULT_THEME, UserRole, User } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('educonnect-user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });

  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('educonnect-theme');
      return saved ? JSON.parse(saved) : DEFAULT_THEME;
    } catch (e) {
      console.error("Failed to parse theme from localStorage", e);
      return DEFAULT_THEME;
    }
  });

  // Close sidebar on mobile when tab changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeTab]);

  // Apply theme variables to CSS
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--font-family', theme.fontFamily);
    
    localStorage.setItem('educonnect-theme', JSON.stringify(theme));
  }, [theme]);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    localStorage.setItem('educonnect-user', JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('educonnect-user');
    setActiveTab('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} appName={theme.appName} logoUrl={theme.logoUrl} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'customizer':
        return user.role === 'admin' ? <Customizer theme={theme} setTheme={setTheme} /> : <Dashboard />;
      case 'communication':
        return user.role === 'secretaria' || user.role === 'admin' ? <CommunicationModule /> : <Dashboard />;
      case 'students':
        return (
          <div className="p-4 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Módulo de Alunos</h2>
            <p className="text-slate-500 mt-2">Esta funcionalidade está sendo customizada para sua infraestrutura.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-x-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        appName={theme.appName}
        logoUrl={theme.logoUrl}
        userRole={user.role}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-h-screen w-full md:ml-64 transition-all duration-300">
        <Header user={user} onLogout={handleLogout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
        
        <footer className="p-6 md:p-8 text-center text-slate-400 text-xs md:sm border-t border-slate-200 bg-white">
          <p>&copy; 2026 {theme.appName}. Todos os direitos reservados. Powered by Recifesolucoes.online</p>
        </footer>
      </div>
      <AIAssistant />
    </div>
  );
}

