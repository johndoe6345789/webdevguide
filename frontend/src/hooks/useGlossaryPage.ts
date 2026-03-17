'use client';

import { useState, useMemo } from 'react';
import { useGlossary } from '@/hooks/useGlossary';

export function useGlossaryPage() {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const {
    terms, categories: rawCategories,
    loading, error, search,
  } = useGlossary();

  const categories = useMemo(() => ['All', ...rawCategories], [rawCategories]);

  const filtered = useMemo(() => {
    return terms.filter((t) => {
      const matchesSearch =
        searchText === '' ||
        t.term.toLowerCase().includes(searchText.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [terms, searchText, activeCategory]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    search(value);
  };

  return {
    searchText,
    setSearch: handleSearch,
    activeCategory,
    setActiveCategory,
    categories,
    filtered,
    totalCount: terms.length,
    loading,
    error,
  };
}
