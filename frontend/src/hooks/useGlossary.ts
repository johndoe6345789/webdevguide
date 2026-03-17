import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchGlossaryTerms, fetchGlossaryCategories, searchGlossary, clearSearch } from '@/store/slices/glossarySlice';

export function useGlossary(category?: string) {
  const dispatch = useAppDispatch();
  const {
    terms, categories, searchResults,
    loading, error,
  } = useAppSelector((s) => s.glossary);

  useEffect(() => {
    dispatch(fetchGlossaryTerms(category));
    dispatch(fetchGlossaryCategories());
  }, [dispatch, category]);

  const search = (query: string) => {
    if (query.trim()) {
      dispatch(searchGlossary(query));
    } else {
      dispatch(clearSearch());
    }
  };

  return { terms, categories, searchResults, loading, error, search };
}
