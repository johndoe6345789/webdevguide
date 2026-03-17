'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FooterLinks from './FooterLinks';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', mt: 'auto' }}>
      <Divider />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <FooterLinks />
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
              {t('footerTagline')}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {t('footerCopyright', { year: new Date().getFullYear() })}
        </Typography>
      </Container>
    </Box>
  );
}
