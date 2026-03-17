'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CtaBackground from './CtaBackground';
import CtaButtons from './CtaButtons';

interface CtaSectionProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  secondaryLabel: string;
}

export default function CtaSection(
  { title, subtitle, buttonLabel, secondaryLabel }:
  CtaSectionProps,
) {
  return (
    <CtaBackground>
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          component="h2"
          fontWeight={800}
          gutterBottom
          sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, lineHeight: 1.2 }}
        >
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 5, opacity: 0.85, lineHeight: 1.7 }}>
          {subtitle}
        </Typography>
        <CtaButtons buttonLabel={buttonLabel} secondaryLabel={secondaryLabel} />
      </Container>
    </CtaBackground>
  );
}
