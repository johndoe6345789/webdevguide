import type { Components, Theme } from '@mui/material/styles';

export function getComponents(mode: 'light' | 'dark'): Components<Theme> {
  const shadow = (light: string, dark: string) => (mode === 'dark' ? dark : light);
  const pick = <T,>(light: T, dark: T): T => (mode === 'dark' ? dark : light);

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

    // ── Glossary tooltip ────────────────────────────────────────
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          '&.glossary-tooltip': {
            backgroundColor: pick('#ffffff', '#1e293b'),
            color: pick('#1e293b', '#e2e8f0'),
            border: `1px solid ${pick('rgba(0,0,0,0.08)', 'rgba(255,255,255,0.08)')}`,
            borderRadius: 12,
            boxShadow: pick(
              '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
              '0 4px 24px rgba(0,0,0,0.40), 0 1px 4px rgba(0,0,0,0.20)',
            ),
            padding: '12px 16px',
            maxWidth: 360,

            // Term header
            '& .glossary-tip-header': {
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 6,
            },
            '& .glossary-tip-term': {
              fontWeight: 700,
              fontSize: '0.875rem',
              lineHeight: 1.3,
            },
            '& .glossary-tip-category': {
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 600,
              borderColor: pick('rgba(0,0,0,0.12)', 'rgba(255,255,255,0.15)'),
              color: pick('#6366f1', '#818cf8'),
            },

            // Definition
            '& .glossary-tip-definition': {
              fontSize: '0.8125rem',
              lineHeight: 1.55,
              color: pick('#334155', '#cbd5e1'),
            },

            // Example
            '& .glossary-tip-example': {
              display: 'block',
              fontSize: '0.75rem',
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: pick('#64748b', '#94a3b8'),
              marginTop: 8,
              paddingTop: 8,
              borderTop: `1px solid ${pick('rgba(0,0,0,0.06)', 'rgba(255,255,255,0.06)')}`,
            },

            // Related terms
            '& .glossary-tip-related': {
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              marginTop: 8,
              paddingTop: 8,
              borderTop: `1px solid ${pick('rgba(0,0,0,0.06)', 'rgba(255,255,255,0.06)')}`,
            },
            '& .glossary-tip-related-chip': {
              height: 20,
              fontSize: '0.625rem',
              fontWeight: 500,
              backgroundColor: pick('rgba(99,102,241,0.08)', 'rgba(129,140,248,0.12)'),
              color: pick('#6366f1', '#a5b4fc'),
            },
          },
        },
        arrow: {
          '.glossary-tooltip &': {
            color: pick('#ffffff', '#1e293b'),
            '&::before': {
              border: `1px solid ${pick('rgba(0,0,0,0.08)', 'rgba(255,255,255,0.08)')}`,
            },
          },
        },
      },
    },

    // ── Glossary inline link ────────────────────────────────────
    MuiLink: {
      styleOverrides: {
        root: {
          '&.glossary-link': {
            color: pick('#6366f1', '#a5b4fc'),
            textDecoration: 'underline',
            textDecorationStyle: 'dotted',
            textDecorationColor: pick('rgba(99,102,241,0.4)', 'rgba(165,180,252,0.4)'),
            textUnderlineOffset: '3px',
            cursor: 'help',
            fontWeight: 500,
            transition: 'color 0.15s, text-decoration-color 0.15s',
            '&:hover': {
              color: pick('#4f46e5', '#c7d2fe'),
              textDecorationColor: pick('#4f46e5', '#c7d2fe'),
              textDecorationStyle: 'solid',
            },
          },
        },
      },
    },
  };
}
