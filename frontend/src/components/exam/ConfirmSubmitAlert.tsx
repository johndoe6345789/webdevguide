'use client';

import { useTranslations } from 'next-intl';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ConfirmSubmitAlertProps {
  answeredCount: number;
  totalCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmSubmitAlert(
  { answeredCount, totalCount,
    onCancel, onConfirm }: ConfirmSubmitAlertProps
) {
  const t = useTranslations('exam');
  const allAnswered = answeredCount >= totalCount;
  return (
    <Alert
      severity="warning"
      sx={{ mt: 3 }}
      action={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" size="small" onClick={onCancel}>{t('cancel')}</Button>
          <Button color="error" size="small" variant="contained" onClick={onConfirm}>{t('confirmSubmit')}</Button>
        </Box>
      }
    >
      {allAnswered
        ? t('confirmAllAnswered')
        : t('confirmPartial', { answered: answeredCount, total: totalCount })}
    </Alert>
  );
}
