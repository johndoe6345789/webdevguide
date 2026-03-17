'use client';

import { useEffect, useState } from 'react';
import { guideApi } from '@/lib/apiClient';
import type { GuideSection } from '@/types/guide';

let cachedSections: GuideSection[] | null = null;

export default function useSearchSections(open: boolean) {
  const [sections, setSections] = useState<GuideSection[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (cachedSections) {
      setSections(cachedSections);
      return;
    }

    let cancelled = false;
    setLoading(true);
    guideApi
      .getSections()
      .then((res) => {
        if (!cancelled) {
          cachedSections = res.data;
          setSections(res.data);
        }
      })
      .catch(() => {
        /* silently fail */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  return { sections, loading };
}
