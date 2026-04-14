import React from 'react';
import { AppTheme } from '../types';
import { RefreshCw, Save, Image as ImageIcon, Type, Palette as PaletteIcon } from 'lucide-react';

interface CustomizerProps {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

export default function Customizer({ theme, setTheme }: CustomizerProps) {
  const handleChange = (key: keyof AppTheme, value: string) => {
    setTheme({ ...theme, [key]: value });
  };

  const resetTheme = () => {
    setTheme({
      primaryColor: '#3b82f6',
      secondaryColor: '#1e293b',
      accentColor: '#f59e0b',
      borderRadius: '0.5rem',
      fontFamily: 'Inter, sans-serif',
      appName: 'EduConnect',
      logoUrl: 'https://picsum.photos/seed/edu/100/100',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Identidade Visual</h2>
          <p className="text-slate-500 mt-1">Personalize a aparência do seu portal escolar em tempo real.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={resetTheme}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-brand hover:bg-slate-50 transition-colors"
          >
            <RefreshCw size={18} />
            <span>Resetar</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-brand hover:opacity-90 transition-opacity shadow-md">
            <Save size={18} />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="bg-white p-8 rounded-brand shadow-sm border border-slate-100 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Type size={20} className="text-brand-primary" />
              <h3>Informações Básicas</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Instituição</label>
                <input 
                  type="text" 
                  value={theme.appName}
                  onChange={(e) => handleChange('appName', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-brand focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL do Logo</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={theme.logoUrl}
                    onChange={(e) => handleChange('logoUrl', e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-brand focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                  />
                  <div className="w-10 h-10 rounded-brand border border-slate-200 overflow-hidden bg-slate-50">
                    <img src={theme.logoUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <PaletteIcon size={20} className="text-brand-primary" />
              <h3>Cores e Estilo</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cor Primária</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={theme.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-10 h-10 p-1 rounded-brand border border-slate-200 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-500">{theme.primaryColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cor Secundária</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={theme.secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="w-10 h-10 p-1 rounded-brand border border-slate-200 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-500">{theme.secondaryColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cor de Destaque</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={theme.accentColor}
                    onChange={(e) => handleChange('accentColor', e.target.value)}
                    className="w-10 h-10 p-1 rounded-brand border border-slate-200 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-500">{theme.accentColor}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Arredondamento (Radius)</label>
                <select 
                  value={theme.borderRadius}
                  onChange={(e) => handleChange('borderRadius', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-brand outline-none"
                >
                  <option value="0rem">Quadrado (0px)</option>
                  <option value="0.25rem">Suave (4px)</option>
                  <option value="0.5rem">Padrão (8px)</option>
                  <option value="1rem">Arredondado (16px)</option>
                  <option value="9999px">Pílula</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fonte</label>
                <select 
                  value={theme.fontFamily}
                  onChange={(e) => handleChange('fontFamily', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-brand outline-none"
                >
                  <option value="Inter, sans-serif">Inter (Moderno)</option>
                  <option value="'Space Grotesk', sans-serif">Space Grotesk (Tech)</option>
                  <option value="'Outfit', sans-serif">Outfit (Amigável)</option>
                  <option value="serif">Serif (Clássico)</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Preview Panel */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Preview em Tempo Real</h3>
          <div className="bg-white rounded-brand shadow-xl overflow-hidden border border-slate-200 aspect-video flex flex-col">
            {/* Mini Header */}
            <div className="h-12 bg-brand-secondary flex items-center px-4 justify-between">
              <div className="flex items-center gap-2">
                <img src={theme.logoUrl} className="w-6 h-6 rounded-brand" referrerPolicy="no-referrer" />
                <span className="text-white text-xs font-bold">{theme.appName}</span>
              </div>
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-white/20"></div>
                <div className="w-4 h-4 rounded-full bg-white/20"></div>
              </div>
            </div>
            {/* Mini Content */}
            <div className="flex-1 p-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 h-24 bg-brand-primary/10 rounded-brand border border-brand-primary/20 p-4">
                  <div className="w-1/2 h-2 bg-brand-primary rounded mb-2"></div>
                  <div className="w-3/4 h-4 bg-brand-primary rounded"></div>
                </div>
                <div className="flex-1 h-24 bg-brand-accent/10 rounded-brand border border-brand-accent/20 p-4">
                  <div className="w-1/2 h-2 bg-brand-accent rounded mb-2"></div>
                  <div className="w-3/4 h-4 bg-brand-accent rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-8 bg-slate-100 rounded-brand"></div>
                <div className="w-full h-8 bg-slate-100 rounded-brand"></div>
                <div className="w-2/3 h-8 bg-slate-100 rounded-brand"></div>
              </div>
              <button className="w-full py-2 bg-brand-primary text-white rounded-brand text-xs font-bold">
                Botão de Exemplo
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            * Este preview reflete como os elementos principais se comportarão com as novas cores e estilos.
          </p>
        </div>
      </div>
    </div>
  );
}
