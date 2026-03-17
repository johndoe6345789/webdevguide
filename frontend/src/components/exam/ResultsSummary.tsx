'use client';

import { useTranslations } from 'next-intl';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import HighlightOff from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ResultsStatsGrid from '@/components/exam/ResultsStatsGrid';
import ScoreCircle from '@/components/exam/ScoreCircle';
import type { ExamAttempt } from '@/store/slices/examSlice';

interface ResultsSummaryProps { result: ExamAttempt }

export default function ResultsSummary({ result }: ResultsSummaryProps) {
  const t = useTranslations('exam');
  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        {result.passed ? <CheckCircleOutline sx={{ fontSize: 64, color: 'success.main', mb: 1 }} /> : <HighlightOff sx={{ fontSize: 64, color: 'error.main', mb: 1 }} />}
        <Typography variant="h3" fontWeight={700} color={result.passed ? 'success.main' : 'error.main'}>
          {result.passed ? t('passedTitle') : t('failedTitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {result.passed ? t('passedMessage') : t('failedMessage')}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}><ScoreCircle score={result.percentage} passed={result.passed} /></Box>
      <ResultsStatsGrid result={result} />
    </>
  );
}
