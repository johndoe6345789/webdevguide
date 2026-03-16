'use client';

import CategoryBreakdown from '@/components/exam/CategoryBreakdown';
import ExamResultActions from '@/components/exam/ExamResultActions';
import ExamReview from '@/components/exam/ExamReview';
import ResultsSummary from '@/components/exam/ResultsSummary';
import type { ExamAttempt, ExamQuestion } from '@/store/slices/examSlice';

interface ExamResultsProps {
  result: ExamAttempt;
  reviewMode: boolean;
  activeExam: { questions: ExamQuestion[]; currentIndex: number; answers: Record<string, string> } | null;
  currentQuestion: ExamQuestion | null;
  onGoTo: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onReview: () => void;
  onRetake: () => void;
  onBackToStart: () => void;
}

export default function ExamResults(p: ExamResultsProps) {
  if (p.reviewMode && p.activeExam && p.currentQuestion) {
    return (
      <ExamReview questions={p.activeExam.questions} currentIndex={p.activeExam.currentIndex} answers={p.activeExam.answers} currentQuestion={p.currentQuestion} onGoTo={p.onGoTo} onPrev={p.onPrev} onNext={p.onNext} onExit={p.onBackToStart} />
    );
  }
  return (
    <>
      <ResultsSummary result={p.result} />
      <CategoryBreakdown breakdown={p.result.categoryBreakdown} />
      <ExamResultActions onReview={p.onReview} onRetake={p.onRetake} onBackToStart={p.onBackToStart} />
    </>
  );
}
