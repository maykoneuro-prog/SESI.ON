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
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('educonnect-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('educonnect-theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

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
          <div className="p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Módulo de Alunos</h2>
            <p className="text-slate-500 mt-2">Esta funcionalidade está sendo customizada para sua infraestrutura.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        appName={theme.appName}
        logoUrl={theme.logoUrl}
        userRole={user.role}
      />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
        
        <footer className="p-8 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
          <p>&copy; 2026 {theme.appName}. Todos os direitos reservados. Powered by Recifesolucoes.online</p>
        </footer>
      </div>
      <AIAssistant />
    </div>
  );
}

