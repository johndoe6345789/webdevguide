'use client';

import { useTranslations } from 'next-intl';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

interface Props {
  onReset: () => void;
}

export default function GeneratorActions({ onReset }: Props) {
  const t = useTranslations('generator');
  return (
    <>
      <Divider />
      <Button
        variant="outlined"
        color="error"
        startIcon={<RestartAltIcon />}
        onClick={onReset}
        fullWidth
      >
        {t('reset')}
      </Button>
    </>
  );
}
