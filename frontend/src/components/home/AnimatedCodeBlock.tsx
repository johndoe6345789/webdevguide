'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { colorize } from './codeSyntax';

const CODE_LINES = [
  'import React from "react";',
  'import { ThemeProvider } from "@mui/material";',
  '',
  'export default function App() {',
  '  const [count, setCount] = useState(0);',
  '',
  '  return (',
  '    <Button onClick={() => setCount(c => c + 1)}>',
  '      Clicked {count} times',
  '    </Button>',
  '  );',
  '}',
];

const CURSOR = '|';
const DOTS = ['#ef4444', '#f59e0b', '#22c55e'];
const wrapSx = { bgcolor: 'rgba(0,0,0,0.35)', borderRadius: 3, p: 2.5, fontFamily: '"Fira Code","Cascadia Code",monospace', fontSize: { xs: '0.7rem', sm: '0.8rem' }, lineHeight: 1.8, textAlign: 'left', color: 'rgba(255,255,255,0.85)', overflow: 'hidden', maxWidth: 480, mx: 'auto', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' } as const;
const numSx = { color: 'rgba(255,255,255,0.3)', mr: 2, userSelect: 'none', fontSize: '0.7em' } as const;
const blinkSx = { animation: 'blink 1s step-end infinite', '@keyframes blink': { '50%': { opacity: 0 } } } as const;

export default function AnimatedCodeBlock() {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (v < CODE_LINES.length) {
      const id = setTimeout(() => setV((n) => n + 1), 150);
      return () => clearTimeout(id);
    }
  }, [v]);
  return (
    <Box sx={wrapSx}>
      <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
        {DOTS.map((c) => <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />)}
      </Box>
      {CODE_LINES.slice(0, v).map((line, i) => (
        <Box key={i} sx={{ minHeight: '1.8em' }}>
          <Box component="span" sx={numSx}>{String(i + 1).padStart(2, ' ')}</Box>
          {colorize(line)}
        </Box>
      ))}
      {v < CODE_LINES.length && (
        <Box sx={{ minHeight: '1.8em', opacity: 0.5 }}>
          <Box component="span" sx={blinkSx}>{CURSOR}</Box>
        </Box>
      )}
    </Box>
  );
}
