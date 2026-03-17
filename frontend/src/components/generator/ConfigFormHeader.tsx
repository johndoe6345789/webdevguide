'use client';
import { useTranslations } from 'next-intl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
  domainLabel: string;
  onBack: () => void;
}

export default function ConfigFormHeader(
  { domainLabel, onBack }: Props,
) {
  const t = useTranslations('generator');
  const tc = useTranslations('common');
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center', gap: 2, mb: 3,
    }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack} size="small"
      >
        {tc('back')}
      </Button>
      <Box>
        <Typography variant="h5" fontWeight={700}>
          {t('configureTitle', {
            domain: domainLabel,
          })}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {t('configureDesc')}
        </Typography>
      </Box>
    </Box>
  );
}
