'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import ExamNavigation from '@/components/exam/ExamNavigation';
import QuestionCard from '@/components/exam/QuestionCard';
import ReviewAnswer from '@/components/exam/ReviewAnswer';
import type { ExamQuestion } from '@/store/slices/examSlice';

interface ExamReviewProps {
  questions: ExamQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  currentQuestion: ExamQuestion;
  onGoTo: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onExit: () => void;
}

export default function ExamReview(p: ExamReviewProps) {
  const t = useTranslations('exam');
  const ci = p.currentIndex;
  const q = p.currentQuestion;
  const pct = ((ci + 1) / p.questions.length) * 100;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>{t('reviewAnswers')}</Typography>
        <Button variant="contained" onClick={p.onExit}>{t('backToStart')}</Button>
      </Box>
      <LinearProgress variant="determinate" value={pct} sx={{ mb: 3, height: 6, borderRadius: 3 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t('questionOf', { current: ci + 1, total: p.questions.length })}
      </Typography>
      <QuestionCard question={q}
        questionNumber={ci + 1}
        selectedOptionId={p.answers[q.id]}
        onSelectOption={() => {}} reviewMode
        correctOptionId={q.correctOptionId} />
      <ReviewAnswer question={q}
        selectedOptionId={p.answers[q.id]} />
      <ExamNavigation questions={p.questions}
        currentIndex={ci} answers={p.answers}
        onGoTo={p.onGoTo} onPrev={p.onPrev}
        onNext={p.onNext} onSubmit={() => {}}
        reviewMode onExitReview={p.onExit} />
    </>
  );
}
