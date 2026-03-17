'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookmarkButton from '@/components/common/BookmarkButton';

export default function ProgressHeader() {
  const t = useTranslations('progress');
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      mb: 1,
    }}>
      <Box>
        <Typography variant="h3" component="h1"
          fontWeight={700} gutterBottom>
          {t('title')}
        </Typography>
        <Typography variant="body1"
          color="text.secondary" sx={{ mb: 3 }}>
          {t('description')}
        </Typography>
      </Box>
      <BookmarkButton title={t('title')}
        path="/progress" section="Tools" />
    </Box>
  );
}
