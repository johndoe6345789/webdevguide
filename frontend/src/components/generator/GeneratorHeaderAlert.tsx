'use client';

import { useTranslations } from 'next-intl';
import Alert from '@mui/material/Alert';

export default function GeneratorHeaderAlert() {
  const t = useTranslations('generator');
  const quickLabel = t('quickGenerate') + ':';
  const scaffolderLabel = t('projectScaffolder') + ':';
  return (
    <Alert severity="info" sx={{ mb: 4 }}>
      <strong>{quickLabel}</strong>{' '}
      {t('quickGenerateInfo')}{' '}
      <strong>{scaffolderLabel}</strong>{' '}
      {t('scaffolderInfo')}
    </Alert>
  );
}
