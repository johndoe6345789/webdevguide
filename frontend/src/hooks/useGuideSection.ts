import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSections, fetchSectionBySlug } from '@/store/slices/guideSlice';

export function useGuideSections() {
  const dispatch = useAppDispatch();
  const { sections, loading, error } = useAppSelector((s) => s.guide);

  useEffect(() => {
    if (sections.length === 0) {
      dispatch(fetchSections());
    }
  }, [dispatch, sections.length]);

  return { sections, loading, error };
}

export function useGuideSection(slug: string) {
  const dispatch = useAppDispatch();
  const { currentSection, loading, error } = useAppSelector((s) => s.guide);

  useEffect(() => {
    dispatch(fetchSectionBySlug(slug));
  }, [dispatch, slug]);

  return { section: currentSection, loading, error };
}
