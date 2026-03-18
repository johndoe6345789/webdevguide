'use client';

import { createContext, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchGlossaryTerms } from '@/store/slices/glossarySlice';
import type { GlossaryTerm } from '@/types/guide';

interface GlossaryContextValue {
  terms: GlossaryTerm[];
  /** Map of lowercase term name → GlossaryTerm for O(1) lookup */
  termMap: Map<string, GlossaryTerm>;
}

const GlossaryContext = createContext<GlossaryContextValue>({
  terms: [],
  termMap: new Map(),
});

export function useGlossaryTerms() {
  return useContext(GlossaryContext);
}

export default function GlossaryProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { terms } = useAppSelector((s) => s.glossary);

  useEffect(() => {
    if (terms.length === 0) {
      dispatch(fetchGlossaryTerms());
    }
  }, [dispatch, terms.length]);

  const termMap = new Map<string, GlossaryTerm>();
  for (const t of terms) {
    termMap.set(t.term.toLowerCase(), t);
  }

  return (
    <GlossaryContext.Provider value={{ terms, termMap }}>
      {children}
    </GlossaryContext.Provider>
  );
}
