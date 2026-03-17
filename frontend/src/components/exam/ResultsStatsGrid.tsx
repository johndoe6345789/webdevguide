'use client';

import { useTranslations } from 'next-intl';
import Chip from '@mui/material/Chip';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ExamAttempt } from '@/store/slices/examSlice';

interface ResultsStatsGridProps { result: ExamAttempt }

export default function ResultsStatsGrid({ result }: ResultsStatsGridProps) {
  const t = useTranslations('exam');
  const scoreLabel = `${result.score}${t('separator')}${result.total}`;
  const pctLabel = `${result.percentage}${t('percentSign')}`;
  return (
    <Grid2 container spacing={2} sx={{ mb: 4 }}>
      <Grid2 size={{ xs: 4 }}>
        <Paper sx={{ p: 2, textAlign: 'center' }} variant="outlined">
          <Typography variant="h5" fontWeight={700}>{scoreLabel}</Typography>
          <Typography variant="caption" color="text.secondary">{t('correctAnswers')}</Typography>
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <Paper sx={{ p: 2, textAlign: 'center' }} variant="outlined">
          <Typography variant="h5" fontWeight={700}>{pctLabel}</Typography>
          <Typography variant="caption" color="text.secondary">{t('score')}</Typography>
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 4 }}>
        <Paper sx={{ p: 2, textAlign: 'center' }} variant="outlined">
          <Chip label={result.passed ? t('passedChip') : t('failedChip')} color={result.passed ? 'success' : 'error'} sx={{ fontWeight: 700, fontSize: '1rem', height: 36 }} />
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>{t('result')}</Typography>
        </Paper>
      </Grid2>
    </Grid2>
  );
}
