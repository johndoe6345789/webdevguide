import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Markdown from '@/components/common/Markdown';
import type { CardGridBlock } from '@/types/content';

export default function CardGridBlockRenderer(
  { cards, columns = 3 }: CardGridBlock,
) {
  const colSize = Math.round(12 / columns);

  return (
    <Grid container spacing={2}>
      {cards.map((card, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: colSize }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              {card.chip && <Chip label={card.chip} size="small" color="primary" sx={{ mb: 1 }} />}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>{card.title}</Typography>
              <Markdown variant="body2" color="text.secondary">{card.body}</Markdown>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
