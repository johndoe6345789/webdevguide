'use client';

import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import HighlightOff from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ScoreCircle from '@/components/exam/ScoreCircle';
import type { ExamAttempt } from '@/store/slices/examSlice';

interface ResultsSummaryProps { result: ExamAttempt }

export default function ResultsSummary({ result }: ResultsSummaryProps) {
  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        {result.passed ? <CheckCircleOutline sx={{ fontSize: 64, color: 'success.main', mb: 1 }} /> : <HighlightOff sx={{ fontSize: 64, color: 'error.main', mb: 1 }} />}
        <Typography variant="h3" fontWeight={700} color={result.passed ? 'success.main' : 'error.main'}>
          {result.passed ? 'Congratulations! You Passed!' : 'Exam Not Passed'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {result.passed ? 'Great job! You have demonstrated solid web development knowledge.' : 'You needed 70% to pass. Keep studying and try again!'}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}><ScoreCircle score={result.percentage} passed={result.passed} /></Box>
      <Grid2 container spacing={2} sx={{ mb: 4 }}>
        <Grid2 size={{ xs: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }} variant="outlined">
            <Typography variant="h5" fontWeight={700}>{result.score}/{result.total}</Typography>
            <Typography variant="caption" color="text.secondary">Correct Answers</Typography>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }} variant="outlined">
            <Typography variant="h5" fontWeight={700}>{result.percentage}%</Typography>
            <Typography variant="caption" color="text.secondary">Score</Typography>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 4 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }} variant="outlined">
            <Chip label={result.passed ? 'PASSED' : 'FAILED'} color={result.passed ? 'success' : 'error'} sx={{ fontWeight: 700, fontSize: '1rem', height: 36 }} />
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>Result</Typography>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
}
