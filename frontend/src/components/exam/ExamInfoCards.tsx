'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

const STATS = [
  { label: 'Questions', value: 30, color: 'primary.main' },
  { label: 'Time Limit', value: '45 min', color: 'warning.main' },
  { label: 'Pass Mark', value: '70%', color: 'success.main' },
];

export default function ExamInfoCards() {
  return (
    <Grid2 container spacing={3} sx={{ mb: 4 }}>
      {STATS.map((s) => (
        <Grid2 key={s.label} size={{ xs: 12, sm: 4 }}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h3" fontWeight={700} sx={{ color: s.color }}>{s.value}</Typography>
              <Typography variant="body2" color="text.secondary">{s.label}</Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}
