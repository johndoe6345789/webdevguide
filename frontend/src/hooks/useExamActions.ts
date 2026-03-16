import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  startExam, setAnswer, submitExam, resetExam,
  nextQuestion, previousQuestion, goToQuestion, enterReviewMode,
} from '@/store/slices/examSlice';
import type { ExamQuestion } from '@/store/slices/examSlice';

const EXAM_TIME_LIMIT = 45 * 60;
const EXAM_QUESTION_COUNT = 30;

export function useExamActions(questionBank: ExamQuestion[]) {
  const dispatch = useAppDispatch();

  const launchExam = useCallback(() => {
    const q = [...questionBank].sort(() => Math.random() - 0.5).slice(0, EXAM_QUESTION_COUNT);
    dispatch(startExam({ questions: q, timeLimit: EXAM_TIME_LIMIT }));
  }, [dispatch, questionBank]);

  const answer = useCallback(
    (questionId: string, optionId: string) => dispatch(setAnswer({ questionId, optionId })),
    [dispatch],
  );

  const submit = useCallback(() => dispatch(submitExam()), [dispatch]);
  const retake = useCallback(() => { dispatch(resetExam()); }, [dispatch]);
  const backToStart = useCallback(() => dispatch(resetExam()), [dispatch]);
  const review = useCallback(() => dispatch(enterReviewMode()), [dispatch]);
  const next = useCallback(() => dispatch(nextQuestion()), [dispatch]);
  const prev = useCallback(() => dispatch(previousQuestion()), [dispatch]);
  const goTo = useCallback((i: number) => dispatch(goToQuestion(i)), [dispatch]);

  return { launchExam, answer, submit, retake, backToStart, review, next, prev, goTo };
}
