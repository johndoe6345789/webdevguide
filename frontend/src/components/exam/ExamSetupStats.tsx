'use client';

import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface ExamSetupStatsProps {
  totalAttempts: number;
  bestScore: number;
  avgScore: number;
}

export default function ExamSetupStats({ totalAttempts, bestScore, avgScore }: ExamSetupStatsProps) {
  const items = [
    { value: totalAttempts, label: 'Total Attempts', color: 'primary.main' },
    { value: `${bestScore}%`, label: 'Best Score', color: 'success.main' },
    { value: `${avgScore}%`, label: 'Average Score', color: 'text.primary' },
  ];

  return (
    <Grid2 container spacing={2} sx={{ mb: 3 }}>
      {items.map((s) => (
        <Grid2 key={s.label} size={{ xs: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }} variant="outlined">
            <Typography variant="h5" fontWeight={700} color={s.color}>{s.value}</Typography>
            <Typography variant="caption" color="text.secondary">{s.label}</Typography>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
}
