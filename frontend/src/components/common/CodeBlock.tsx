'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CopyButton from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = 'tsx', filename }: CodeBlockProps) {
  return (
    <Box sx={{ position: 'relative', mb: 2, borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider' }}>
      {filename && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 0.75, bgcolor: 'action.hover', borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="caption" fontFamily="monospace" color="text.secondary">{filename}</Typography>
          <Typography variant="caption" color="text.secondary">{language}</Typography>
        </Box>
      )}
      <Box sx={{ position: 'relative' }}>
        <CopyButton text={code} />
        <Box
          component="pre"
          sx={{
            m: 0, p: 2, pr: 6, overflow: 'auto',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0d1117' : '#f6f8fa',
            fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
            fontSize: '0.85rem', lineHeight: 1.6, maxHeight: 500,
          }}
        >
          <code>{code}</code>
        </Box>
      </Box>
    </Box>
  );
}
