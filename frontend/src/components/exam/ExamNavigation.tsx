'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import type { ExamQuestion } from '@/store/slices/examSlice';

interface ExamNavigationProps {
  questions: ExamQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  onGoTo: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  reviewMode?: boolean;
  onExitReview?: () => void;
}

export default function ExamNavigation(
  { questions, currentIndex, answers,
    onGoTo, onPrev, onNext, onSubmit,
    reviewMode, onExitReview }: ExamNavigationProps
) {
  const t = useTranslations('exam');
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 3, mb: 2, justifyContent: 'center' }}>
        {questions.map((q, i) => {
          const color = reviewMode
            ? (answers[q.id] === q.correctOptionId ? 'success' : 'error')
            : (i === currentIndex ? 'primary' : (q.id in answers ? 'success' : 'default'));
          const variant = i === currentIndex ? 'filled' : 'outlined';
          return <Chip key={q.id} label={i + 1} size="small" onClick={() => onGoTo(i)} color={color} variant={variant} sx={{ minWidth: 36, cursor: 'pointer' }} />;
        })}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Button variant="outlined" onClick={onPrev} disabled={currentIndex === 0}>{t('previous')}</Button>
        {reviewMode
          ? <Button variant="outlined" onClick={onExitReview}>{t('exitReview')}</Button>
          : <Button variant="contained" color="error" onClick={onSubmit}>{t('submit')}</Button>}
        <Button variant="outlined" onClick={onNext} disabled={currentIndex === questions.length - 1}>{t('next')}</Button>
      </Box>
    </>
  );
}
