import axios from 'axios';
import type { GuideSectionContent } from '@/types/content';
import type { ExamQuestion } from '@/types/exam';
import type { GuideSection, GlossaryTerm } from '@/types/guide';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Guide ──────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  title: string;
  slug: string;
  order: number;
  icon: string;
}

export const guideApi = {
  getSections: () =>
    apiClient.get<GuideSection[]>('/guide/sections'),

  getSectionBySlug: (slug: string) =>
    apiClient.get<GuideSectionContent>(`/guide/sections/${slug}`),

  getNavigation: () =>
    apiClient.get<NavItem[]>('/guide/navigation'),
};

// ── Exam ───────────────────────────────────────────────────────────

export interface ExamCategory {
  category: string;
  count: number;
}

export const examApi = {
  getQuestions: (params?: { category?: string; difficulty?: string }) =>
    apiClient.get<ExamQuestion[]>('/exam/questions', { params }),

  getRandomQuestions: (count = 30) =>
    apiClient.get<ExamQuestion[]>('/exam/questions/random', { params: { count } }),

  getCategories: () =>
    apiClient.get<ExamCategory[]>('/exam/categories'),
};

// ── Glossary ───────────────────────────────────────────────────────

interface GlossaryCategory {
  category: string;
}

export const glossaryApi = {
  getTerms: (category?: string) =>
    apiClient.get<GlossaryTerm[]>('/glossary/terms', {
      params: category ? { category } : {},
    }),

  getCategories: () =>
    apiClient.get<GlossaryCategory[]>('/glossary/categories'),

  search: (query: string) =>
    apiClient.get<GlossaryTerm[]>('/glossary/search', { params: { q: query } }),
};

// apiClient is used internally by the api objects above
