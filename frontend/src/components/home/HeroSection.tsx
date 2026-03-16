'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  getStartedLabel: string;
  learnMoreLabel: string;
}

export default function HeroSection({ title, subtitle, getStartedLabel, learnMoreLabel }: HeroSectionProps) {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)', color: 'white', py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
          {title}
        </Typography>
        <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
          {subtitle}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button component={Link} href="/getting-started" variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.dark', '&:hover': { bgcolor: 'grey.100' }, px: 4, py: 1.5 }}>
            {getStartedLabel}
          </Button>
          <Button component={Link} href="/fundamentals" variant="outlined" size="large" sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }, px: 4, py: 1.5 }}>
            {learnMoreLabel}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
