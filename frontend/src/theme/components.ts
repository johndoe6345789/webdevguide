import type { Components, Theme } from '@mui/material/styles';

export function getComponents(mode: 'light' | 'dark'): Components<Theme> {
  const shadow = (light: string, dark: string) => (mode === 'dark' ? dark : light);

  return {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 8, padding: '8px 24px' },
        contained: { boxShadow: 'none', '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.15)' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: shadow('0 2px 8px rgba(0,0,0,0.08)', '0 2px 8px rgba(0,0,0,0.4)') },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: shadow('0 1px 3px rgba(0,0,0,0.08)', '0 1px 3px rgba(0,0,0,0.4)') },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  };
}
