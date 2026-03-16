import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ListBlock } from '@/types/content';

export default function ListBlockRenderer({ items, ordered, heading }: ListBlock) {
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Box>
      {heading && (
        <Typography variant="h6" fontWeight={600} gutterBottom>{heading}</Typography>
      )}
      <Box component={Tag} sx={{ pl: 3, '& li': { mb: 0.5 } }}>
        {items.map((item, i) => (
          <Typography key={i} component="li" variant="body1">{item}</Typography>
        ))}
      </Box>
    </Box>
  );
}
