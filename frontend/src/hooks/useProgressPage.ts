'use client';

import { useState } from 'react';
import { ALL_SECTIONS } from '@/hooks/progressSections';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearBookmarks } from '@/store/slices/bookmarkSlice';
import { clearHistory } from '@/store/slices/examSlice';
import { resetProgress } from '@/store/slices/progressSlice';

export function useProgressPage() {
  const dispatch = useAppDispatch();
  const {
    completedSections, chaptersVisited,
    totalTimeSpent,
  } = useAppSelector((s) => s.progress);
  const examHistory = useAppSelector(
    (s) => s.exam.history,
  );
  const [showReset, setShowReset] = useState(false);

  const total = ALL_SECTIONS.length;
  const completionPercent = Math.round(
    (completedSections.length / total) * 100,
  );
  const bestExamScore = examHistory.length > 0
    ? Math.max(
      ...examHistory.map((e) => e.percentage),
    ) : 0;
  const avgExamScore = examHistory.length > 0
    ? Math.round(
      examHistory.reduce(
        (s, e) => s + e.percentage, 0,
      ) / examHistory.length,
    ) : 0;
  const timeMinutes = Math.round(
    totalTimeSpent / 60,
  );
  const handleReset = () => {
    dispatch(resetProgress());
    dispatch(clearHistory());
    dispatch(clearBookmarks());
    setShowReset(false);
  };

  return {
    allSections: ALL_SECTIONS,
    completedSections, chaptersVisited,
    examHistory, completionPercent,
    bestExamScore, avgExamScore, timeMinutes,
    showReset, setShowReset, handleReset,
  };
}
