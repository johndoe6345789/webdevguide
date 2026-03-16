'use client';

import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import Replay from '@mui/icons-material/Replay';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ExamResultActionsProps {
  onReview: () => void;
  onRetake: () => void;
  onBackToStart: () => void;
}

export default function ExamResultActions({ onReview, onRetake, onBackToStart }: ExamResultActionsProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="contained" startIcon={<CheckCircleOutline />} onClick={onReview}>Review Answers</Button>
      <Button variant="outlined" startIcon={<Replay />} onClick={onRetake}>Retake Exam</Button>
      <Button variant="text" onClick={onBackToStart}>Back to Start</Button>
    </Box>
  );
}
