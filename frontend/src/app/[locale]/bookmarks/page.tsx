'use client';

import { useTranslations } from 'next-intl';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import BookmarkCard from '@/components/bookmarks/BookmarkCard';
import BookmarkEmptyState from '@/components/bookmarks/BookmarkEmptyState';
import BookmarksHeader from '@/components/bookmarks/BookmarksHeader';
import ClearAllButton from '@/components/bookmarks/ClearAllButton';
import { useBookmarksPage } from '@/hooks/useBookmarksPage';

export default function BookmarksPage() {
  const {
    bookmarks, showConfirm,
    setShowConfirm, handleClearAll,
  } = useBookmarksPage();
  const t = useTranslations('bookmarks');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BookmarksHeader count={bookmarks.length} />

      {bookmarks.length > 0 && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <ClearAllButton
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            onClear={handleClearAll}
          />
        </Box>
      )}

      {bookmarks.length === 0 ? (
        <BookmarkEmptyState />
      ) : (
        <Grid container spacing={3}>
          {bookmarks.map((b) => (
            <Grid key={b.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <BookmarkCard {...b} />
            </Grid>
          ))}
        </Grid>
      )}

      {bookmarks.length > 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          {t('browserSaveNotice')}
        </Alert>
      )}
    </Container>
  );
}
