import { useState, useMemo } from 'react';
import { useExamActions } from '@/hooks/useExamActions';
import { useExamQuestions } from '@/hooks/useExamQuestions';
import { useAppSelector } from '@/store/hooks';

type ExamView = 'setup' | 'active' | 'results';

export function useExamPage() {
  const { activeExam, result, history, reviewMode } = useAppSelector((s) => s.exam);
  const { questions: questionBank } = useExamQuestions(30);
  const actions = useExamActions(questionBank);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const view: ExamView = useMemo(() => {
    if (result) return 'results';
    if (activeExam) return 'active';
    return 'setup';
  }, [result, activeExam]);

  const currentQuestion = activeExam?.questions[activeExam.currentIndex] ?? null;
  const answeredCount = activeExam ? Object.keys(activeExam.answers).length : 0;

  const timeRemaining = useMemo(() => {
    if (!activeExam) return 0;
    const elapsed = Math.floor((Date.now() - new Date(activeExam.startedAt).getTime()) / 1000);
    return Math.max(activeExam.timeLimit - elapsed, 0);
  }, [activeExam]);

  return {
    view, activeExam, result, history, reviewMode,
    currentQuestion, answeredCount, timeRemaining,
    showConfirmSubmit, setShowConfirmSubmit, ...actions,
  };
}
