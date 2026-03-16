import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchExamQuestions } from '@/store/slices/examSlice';

export function useExamQuestions(count = 30) {
  const dispatch = useAppDispatch();
  const { questionBank, loading, error } = useAppSelector((s) => s.exam);

  useEffect(() => {
    if (questionBank.length === 0) {
      dispatch(fetchExamQuestions(count));
    }
  }, [dispatch, count, questionBank.length]);

  return { questions: questionBank, loading, error };
}
