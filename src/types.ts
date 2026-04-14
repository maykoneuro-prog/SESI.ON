export type UserRole = 'admin' | 'secretaria' | 'aluno' | 'pais';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface AppTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: string;
  fontFamily: string;
  appName: string;
  logoUrl: string;
}

export const DEFAULT_THEME: AppTheme = {
  primaryColor: '#0B3C88', // SESI Blue
  secondaryColor: '#1e293b', // slate-800
  accentColor: '#f59e0b', // amber-500
  borderRadius: '0.5rem',
  fontFamily: 'Inter, sans-serif',
  appName: 'SESI.ON',
  logoUrl: 'https://i.imgur.com/RjPhZLy_d.png?maxwidth=520&shape=thumb&fidelity=high',
};

export interface Student {
  id: string;
  name: string;
  grade: string;
  status: 'active' | 'inactive';
  lastActivity: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}
