'use client';

import { useTranslations } from 'next-intl';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function EmptyState() {
  const t = useTranslations('glossary');
  return (
    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover' }}>
      <MenuBookIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
      <Typography variant="h6" gutterBottom>{t('noTermsFound')}</Typography>
      <Typography variant="body2" color="text.secondary">
        {t('tryDifferentSearch')}
      </Typography>
    </Paper>
  );
}
