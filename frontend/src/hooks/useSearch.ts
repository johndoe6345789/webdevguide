'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useSearchSections from './useSearchSections';

const OPEN_EVENT = 'webdevguide:open-search';

/** Fire this from any component to open the search dialog. */
export function openSearchDialog() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export default function useSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { sections, loading } = useSearchSections(open);

  useEffect(() => {
    function onOpenEvent() { setOpen(true); setQuery(''); }
    window.addEventListener(OPEN_EVENT, onOpenEvent);
    return () => window.removeEventListener(OPEN_EVENT, onOpenEvent);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return sections
      .filter((s) => {
        const haystack = `${s.title} ${s.description} ${s.slug}`.toLowerCase();
        return terms.every((term) => haystack.includes(term));
      })
      .slice(0, 12);
  }, [query, sections]);

  const handleOpen = useCallback(() => { setOpen(true); setQuery(''); }, []);
  const handleClose = useCallback(() => { setOpen(false); setQuery(''); }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => { if (!prev) setQuery(''); return !prev; });
      }
      if (e.key === 'Escape' && open) handleClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, handleClose]);

  return { open, query, setQuery, results, loading, handleOpen, handleClose };
}
