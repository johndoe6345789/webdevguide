import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Markdown from '@/components/common/Markdown';
import type { ListBlock } from '@/types/content';

export default function ListBlockRenderer(
  { items, ordered, heading }: ListBlock,
) {
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Box>
      {heading && (
        <Typography variant="h6" fontWeight={600} gutterBottom>{heading}</Typography>
      )}
      <Box component={Tag} sx={{ pl: 3, '& li': { mb: 0.5 } }}>
        {items.map((item, i) => (
          <li key={i}><Markdown variant="body1">{item}</Markdown></li>
        ))}
      </Box>
    </Box>
  );
}
