'use client';

import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const DIFF_COLORS: Record<string, 'success' | 'warning' | 'error'> = { beginner: 'success', intermediate: 'warning', advanced: 'error' };
const clampSx = { overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as const;
const itemSx = { borderRadius: 2, mx: 1, mb: 0.5, '&:hover': { bgcolor: 'action.hover' } } as const;
const emptySx = { textAlign: 'center', py: 4 } as const;

interface SearchResult {
  id: string | number; slug: string;
  title: string; description: string;
  difficulty: string;
}
interface Props {
  results: SearchResult[];
  query: string; loading: boolean;
  onSelect: (slug: string) => void;
  tCommon: (k: string) => string;
  noResultsText: string;
  startTypingText: string;
}

export default function SearchResults(
  { results, query, loading, onSelect,
    tCommon, noResultsText, startTypingText }: Props,
) {
  const empty = query.trim().length > 0 && results.length === 0 && !loading;
  return (<>
    {empty && <Box sx={emptySx}><Typography color="text.secondary">{noResultsText}</Typography></Box>}
    {results.length > 0 && (<List disablePadding>
      {results.map((s) => (
        <ListItemButton key={s.id} onClick={() => onSelect(s.slug)} sx={itemSx}>
          <ListItemText
            primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Typography variant="subtitle2" fontWeight={600}>{s.title}</Typography><Chip label={tCommon(s.difficulty)} size="small" color={DIFF_COLORS[s.difficulty] || 'default'} sx={{ height: 20, fontSize: '0.7rem' }} /></Box>}
            secondary={<Typography variant="body2" color="text.secondary" sx={clampSx}>{s.description}</Typography>}
          />
        </ListItemButton>))}
    </List>)}
    {!query.trim() && !loading && (<Box sx={emptySx}>
      <SearchIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
      <Typography color="text.secondary">{startTypingText}</Typography>
    </Box>)}
  </>);
}
