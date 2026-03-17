'use client';

import { useTranslations } from 'next-intl';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ClearAllButtonProps {
  showConfirm: boolean;
  setShowConfirm: (v: boolean) => void;
  onClear: () => void;
}

export default function ClearAllButton(
  { showConfirm, setShowConfirm, onClear }:
  ClearAllButtonProps,
) {
  const t = useTranslations('bookmarks');
  if (showConfirm) {
    return (
      <Alert severity="warning" action={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" color="error" onClick={onClear}>{t('yesClearAll')}</Button>
          <Button size="small" onClick={() => setShowConfirm(false)}>{t('cancel')}</Button>
        </Box>
      }>
        {t('clearConfirm')}
      </Alert>
    );
  }

  return (
    <Button startIcon={<DeleteSweepIcon />} color="error" size="small" onClick={() => setShowConfirm(true)}>
      {t('clearAll')}
    </Button>
  );
}
