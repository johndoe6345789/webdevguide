import { useState, useEffect, useMemo } from 'react';
import { examApi } from '@/lib/apiClient';
import type { ExamCategory } from '@/lib/apiClient';
import { useAppSelector } from '@/store/hooks';

const DEFAULT_COUNT = 30;

export function useExamSetup() {
  const { history } = useAppSelector((s) => s.exam);
  const [questionCount, setQuestionCount] = useState(DEFAULT_COUNT);
  const [categories, setCategories] = useState<ExamCategory[]>([]);

  useEffect(() => {
    examApi.getCategories().then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  const bestScore = useMemo(() => {
    if (history.length === 0) return 0;
    return Math.max(...history.map((h) => h.percentage));
  }, [history]);

  const avgScore = useMemo(() => {
    if (history.length === 0) return 0;
    const sum = history.reduce((a, h) => a + h.percentage, 0);
    return Math.round(sum / history.length);
  }, [history]);

  return {
    questionCount,
    setQuestionCount,
    categories,
    history,
    bestScore,
    avgScore,
  };
}
