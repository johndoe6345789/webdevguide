'use client';

import { useTranslations } from 'next-intl';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookmarkButton from '@/components/common/BookmarkButton';

export default function GlossaryHeader() {
  const t = useTranslations('glossary');
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
        <Box>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            {t('title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
            {t('description')}
          </Typography>
        </Box>
        <BookmarkButton title={t('title')} path="/glossary" section="Reference" />
      </Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        {t('hoverTip')}{' '}
        <Box component="span" sx={{ borderBottom: '1px dashed', borderColor: 'primary.main', color: 'primary.main' }}>
          {t('dottedTerms')}
        </Box>{' '}
        {t('hoverTipSuffix')}
      </Alert>
    </>
  );
}
