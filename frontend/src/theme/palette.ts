import type { PaletteOptions } from '@mui/material/styles';

export function getPalette(mode: 'light' | 'dark'): PaletteOptions {
  return {
    mode,
    primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5', contrastText: '#ffffff' },
    secondary: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2', contrastText: '#000000' },
    success: { main: '#22c55e', light: '#4ade80', dark: '#16a34a' },
    warning: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
    error: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
    ...(mode === 'dark'
      ? { background: { default: '#0f172a', paper: '#1e293b' }, text: { primary: '#e2e8f0', secondary: '#94a3b8' } }
      : { background: { default: '#f8fafc', paper: '#ffffff' } }),
  };
}
