'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FooterLinks from './FooterLinks';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', mt: 'auto' }}>
      <Divider />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <FooterLinks />
          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              {'About'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {'A free, open-source guide for complete beginners who want to learn React web development.'}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {`© ${new Date().getFullYear()} React Web Dev Guide. Built for complete beginners.`}
        </Typography>
      </Container>
    </Box>
  );
}
