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
            padding: 0,
            maxWidth: 400,
            maxHeight: 320,
            display: 'flex',
            flexDirection: 'column' as const,
            overflow: 'hidden',

            // Scrollable body
            '& .glossary-tip-body': {
              padding: '12px 16px',
              overflowY: 'auto',
              flex: 1,
              minHeight: 0,
              '&::-webkit-scrollbar': { width: 5 },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': {
                background: pick('rgba(0,0,0,0.15)', 'rgba(255,255,255,0.15)'),
                borderRadius: 3,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: pick('rgba(0,0,0,0.25)', 'rgba(255,255,255,0.25)'),
              },
            },

            // Sticky bookmarks footer
            '& .glossary-tip-footer': {
              padding: '8px 12px',
              borderTop: `1px solid ${pick('rgba(0,0,0,0.06)', 'rgba(255,255,255,0.06)')}`,
              backgroundColor: pick('rgba(0,0,0,0.02)', 'rgba(255,255,255,0.02)'),
              flexShrink: 0,
            },
            '& .glossary-tip-bookmarks-label': {
              display: 'block',
              fontSize: '0.625rem',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              color: pick('#94a3b8', '#64748b'),
              marginBottom: 6,
            },
            '& .glossary-tip-bookmarks': {
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
            },
            '& .glossary-tip-bookmarks-item': {
              fontSize: '0.65rem',
              padding: '2px 8px',
              borderRadius: 10,
              backgroundColor: pick('rgba(99,102,241,0.08)', 'rgba(129,140,248,0.12)'),
              color: pick('#6366f1', '#a5b4fc'),
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: pick('rgba(99,102,241,0.16)', 'rgba(129,140,248,0.22)'),
              },
            },

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

            // Example
            '& .glossary-tip-example': {
              display: 'block',
              fontSize: '0.75rem',
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: pick('#64748b', '#94a3b8'),
              marginTop: 6,
              marginBottom: 2,
            },

            // Numbered glossary list
            '& .glossary-tip-list': {
              margin: 0,
              marginTop: 8,
              paddingLeft: 20,
              paddingTop: 8,
              borderTop: `1px solid ${pick('rgba(0,0,0,0.06)', 'rgba(255,255,255,0.06)')}`,
              listStyleType: 'decimal',
            },
            '& .glossary-tip-list-item': {
              fontSize: '0.775rem',
              lineHeight: 1.5,
              marginBottom: 6,
              color: pick('#334155', '#cbd5e1'),
              '&:last-child': { marginBottom: 0 },
              '& strong': {
                color: pick('#1e293b', '#e2e8f0'),
                fontWeight: 600,
              },
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
