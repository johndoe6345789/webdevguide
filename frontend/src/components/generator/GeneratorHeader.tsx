'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import BookmarkButton from '@/components/common/BookmarkButton';
import GeneratorHeaderAlert from './GeneratorHeaderAlert';

export default function GeneratorHeader() {
  const t = useTranslations('generator');
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
            {t('title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            {t('headerDesc')}
          </Typography>
        </Box>
        <BookmarkButton title={t('title')} path="/code-generator" section="Tools" />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        <Chip label={t('chipInteractiveTool')} color="primary" size="small" />
        <Chip label={t('chipProjectScaffolder')} size="small" variant="outlined" />
        <Chip label={t('chipRealTimePreview')} size="small" variant="outlined" />
        <Chip label={t('chipCopyPaste')} size="small" variant="outlined" />
      </Box>
      <Divider sx={{ mb: 4 }} />
      <GeneratorHeaderAlert />
    </>
  );
}
