'use client';

import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import HighlightOff from '@mui/icons-material/HighlightOff';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import type { ExamQuestion } from '@/store/slices/examSlice';

interface ReviewAnswerProps {
  question: ExamQuestion;
  selectedOptionId?: string;
}

export default function ReviewAnswer(
  { question, selectedOptionId }: ReviewAnswerProps
) {
  const ok = selectedOptionId === question.correctOptionId;
  const correctText = question.options.find(
    (o) => o.id === question.correctOptionId
  )?.text;
  return (
    <Alert severity={ok ? 'success' : 'error'} icon={ok ? <CheckCircleOutline /> : <HighlightOff />} sx={{ mt: 2 }}>
      <Typography variant="subtitle2" fontWeight={600}>
        {ok ? 'Correct!' : `Incorrect. The correct answer is: ${correctText}`}
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.5 }}>{question.explanation}</Typography>
    </Alert>
  );
}
