'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearBookmarks } from '@/store/slices/bookmarkSlice';
import { clearHistory } from '@/store/slices/examSlice';
import { resetProgress } from '@/store/slices/progressSlice';

const ALL_SECTIONS = [
  { id: 'getting-started', title: 'Getting Started', href: '/getting-started' },
  { id: 'fundamentals', title: 'React Fundamentals', href: '/fundamentals' },
  { id: 'examples', title: 'Website Examples', href: '/examples' },
  { id: 'features', title: 'Core Features', href: '/features' },
  { id: 'ai-development', title: 'AI-Assisted Development', href: '/ai-development' },
  { id: 'lua-engine', title: 'Lua Engine', href: '/lua-engine' },
  { id: 'data-architecture', title: 'Data Architecture', href: '/data-architecture' },
  { id: 'eslint-guide', title: 'ESLint Guide', href: '/eslint-guide' },
  { id: 'backend-guide', title: 'Backend Guide', href: '/backend-guide' },
  { id: 'docker-guide', title: 'Docker Guide', href: '/docker-guide' },
  { id: 'code-generator', title: 'Code Generator', href: '/code-generator' },
  { id: 'resources', title: 'Resources', href: '/resources' },
];

export function useProgressPage() {
  const dispatch = useAppDispatch();
  const { completedSections, chaptersVisited, totalTimeSpent } = useAppSelector((s) => s.progress);
  const examHistory = useAppSelector((s) => s.exam.history);
  const [showReset, setShowReset] = useState(false);

  const completionPercent = Math.round((completedSections.length / ALL_SECTIONS.length) * 100);
  const bestExamScore = examHistory.length > 0 ? Math.max(...examHistory.map((e) => e.percentage)) : 0;
  const avgExamScore = examHistory.length > 0 ? Math.round(examHistory.reduce((s, e) => s + e.percentage, 0) / examHistory.length) : 0;
  const timeMinutes = Math.round(totalTimeSpent / 60);

  const handleReset = () => { dispatch(resetProgress()); dispatch(clearHistory()); dispatch(clearBookmarks()); setShowReset(false); };

  return {
    allSections: ALL_SECTIONS, completedSections, chaptersVisited, examHistory,
    completionPercent, bestExamScore, avgExamScore, timeMinutes,
    showReset, setShowReset, handleReset,
  };
}
