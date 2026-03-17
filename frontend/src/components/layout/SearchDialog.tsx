'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import type useSearch from '@/hooks/useSearch';
import { useRouter } from '@/i18n/navigation';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

type SearchState = ReturnType<typeof useSearch>;
interface SearchDialogProps { search: SearchState }

const paperSx = { borderRadius: 3, overflow: 'hidden', position: 'relative' };
const backdropSx = { backdropFilter: 'blur(4px)' };
const contentSx = { px: 1, pt: 1, pb: 2, minHeight: 120, maxHeight: 400 };

export default function SearchDialog(
  { search }: SearchDialogProps,
) {
  const { open, query, setQuery, results, loading, handleClose } = search;
  const t = useTranslations('search'); const tCommon = useTranslations('common');
  const router = useRouter(); const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) {
      const tm = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(tm);
    }
  }, [open]);
  function handleSelect(slug: string) {
    handleClose(); router.push(`/${slug}`);
  }
  return (
    <Dialog open={open} onClose={handleClose}
      fullWidth maxWidth="sm"
      PaperProps={{ sx: paperSx }}
      slotProps={{ backdrop: { sx: backdropSx } }}
    >
      <SearchInput inputRef={inputRef}
        query={query} onQueryChange={setQuery}
        loading={loading} onClose={handleClose}
        placeholder={t('placeholder')}
        hint={t('hint')} />
      <DialogContent sx={contentSx}>
        <SearchResults results={results}
          query={query} loading={loading}
          onSelect={handleSelect} tCommon={tCommon}
          noResultsText={t('noResults')}
          startTypingText={t('startTyping')} />
      </DialogContent>
    </Dialog>
  );
}
