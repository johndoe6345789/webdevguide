'use client';

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
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Review Answers</Typography>
        <Button variant="contained" onClick={p.onExit}>Back to Start</Button>
      </Box>
      <LinearProgress variant="determinate" value={((p.currentIndex + 1) / p.questions.length) * 100} sx={{ mb: 3, height: 6, borderRadius: 3 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Question {p.currentIndex + 1} of {p.questions.length}
      </Typography>
      <QuestionCard question={p.currentQuestion} questionNumber={p.currentIndex + 1} selectedOptionId={p.answers[p.currentQuestion.id]} onSelectOption={() => {}} reviewMode correctOptionId={p.currentQuestion.correctOptionId} />
      <ReviewAnswer question={p.currentQuestion} selectedOptionId={p.answers[p.currentQuestion.id]} />
      <ExamNavigation questions={p.questions} currentIndex={p.currentIndex} answers={p.answers} onGoTo={p.onGoTo} onPrev={p.onPrev} onNext={p.onNext} onSubmit={() => {}} reviewMode onExitReview={p.onExit} />
    </>
  );
}
