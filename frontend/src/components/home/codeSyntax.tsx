import Box from '@mui/material/Box';

const KEYWORDS = ['import', 'from', 'export', 'default', 'function', 'const', 'return'];

export function colorize(line: string) {
  if (!line.trim()) return ' ';
  const parts = line.split(/(\s+|[{}()<>;"',=.])/);
  return parts.map((part, i) => {
    if (KEYWORDS.includes(part)) return <Box component="span" key={i} sx={{ color: '#c084fc' }}>{part}</Box>;
    if (/^["']/.test(part)) return <Box component="span" key={i} sx={{ color: '#86efac' }}>{part}</Box>;
    if (/^[{}()<>]$/.test(part)) return <Box component="span" key={i} sx={{ color: '#fbbf24' }}>{part}</Box>;
    return <Box component="span" key={i}>{part}</Box>;
  });
}
