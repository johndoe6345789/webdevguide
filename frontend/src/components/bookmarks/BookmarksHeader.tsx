'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

interface BookmarksHeaderProps {
  count: number;
}

export default function BookmarksHeader({ count }: BookmarksHeaderProps) {
  const t = useTranslations('bookmarks');
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Box>
        <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
          {t('title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {t('description')}
        </Typography>
      </Box>
      <Chip label={t('saved', { count })} color="primary" />
    </Box>
  );
}
