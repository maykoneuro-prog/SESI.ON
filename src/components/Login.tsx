import React, { useState } from 'react';
import { User as UserType, UserRole } from '../types';
import { Lock, User as UserIcon, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginProps {
  onLogin: (user: UserType) => void;
  appName: string;
  logoUrl: string;
}

const MOCK_USERS: Record<string, { password: string, name: string, role: UserRole, email: string }> = {
  '00010001': { password: 'admin123', name: 'Administrador Geral', role: 'admin', email: 'admin@escola.com' },
  '00020002': { password: 'sec123', name: 'Ana Secretaria', role: 'secretaria', email: 'secretaria@escola.com' },
  '00030003': { password: 'aluno123', name: 'João Aluno', role: 'aluno', email: 'joao.aluno@escola.com' },
  '00040004': { password: 'pais123', name: 'Maria Responsável', role: 'pais', email: 'maria.pais@escola.com' },
};

export default function Login({ onLogin, appName, logoUrl }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const user = MOCK_USERS[username];
      if (user && user.password === password) {
        onLogin({
          id: username,
          username,
          name: user.name,
          role: user.role,
          email: user.email
        });
      } else {
        setError('Código ou senha inválidos. Verifique os dados e tente novamente.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <img 
            src={logoUrl} 
            alt="Logo" 
            className="w-20 h-20 mx-auto rounded-brand shadow-lg mb-6 object-cover"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-3xl font-bold text-slate-900">{appName}</h1>
          <p className="text-slate-500 mt-2">Acesse o portal da sua instituição</p>
        </div>

        <div className="bg-white p-8 rounded-brand shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Código de Acesso (8 dígitos)</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  maxLength={8}
                  placeholder="000XXXXX"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-brand focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-brand focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-brand flex gap-2 text-red-600 text-sm animate-in shake duration-300">
                <AlertCircle size={18} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-primary text-white rounded-brand font-bold shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Entrar no Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center uppercase tracking-widest font-bold mb-4">Credenciais de Teste</p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <p className="font-bold text-slate-700">ADMIN</p>
                <p>Cod: 00010001</p>
                <p>Pass: admin123</p>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <p className="font-bold text-slate-700">SECRETARIA</p>
                <p>Cod: 00020002</p>
                <p>Pass: sec123</p>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <p className="font-bold text-slate-700">ALUNO</p>
                <p>Cod: 00030003</p>
                <p>Pass: aluno123</p>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <p className="font-bold text-slate-700">PAIS</p>
                <p>Cod: 00040004</p>
                <p>Pass: pais123</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm">
          Esqueceu sua senha? Entre em contato com a secretaria.
        </p>
      </div>
    </div>
  );
}
