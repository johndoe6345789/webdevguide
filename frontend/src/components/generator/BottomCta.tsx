'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function BottomCta() {
  const t = useTranslations('generator');
  return (
    <>
      <Divider sx={{ my: 6 }} />
      <Card variant="outlined" sx={{ textAlign: 'center', p: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {t('wantLearnMore')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
            {t('bottomCtaDesc')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" href="/fundamentals">{t('reactFundamentals')}</Button>
            <Button variant="outlined" size="large" href="/examples">{t('seeFullExamples')}</Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
