'use client';
import { useTranslations } from 'next-intl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const sx = { py: 4, textAlign: 'center' };

export default function ViewerEmptyState() {
  const t = useTranslations('generator');
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={sx}
        >
          {t('selectFilePrompt')}
        </Typography>
      </CardContent>
    </Card>
  );
}
