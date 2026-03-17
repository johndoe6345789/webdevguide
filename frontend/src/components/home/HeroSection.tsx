'use client';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import AnimatedCodeBlock from './AnimatedCodeBlock';
import HeroBackground from './HeroBackground';
import HeroButtons from './HeroButtons';
import HeroDecorations from './HeroDecorations';

interface HeroSectionProps {
  title: string; subtitle: string;
  getStartedLabel: string; learnMoreLabel: string;
  badgeLabel: string;
}

const chipSx = { mb: 3, bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.85rem', height: 36, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' } as const;
const titleSx = { fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' }, mb: 2, lineHeight: 1.15, letterSpacing: '-0.02em' } as const;
const subtitleSx = { mb: 5, opacity: 0.85, maxWidth: 640, mx: 'auto', fontWeight: 400, lineHeight: 1.6, fontSize: { xs: '1rem', md: '1.15rem' } } as const;

export default function HeroSection(
  { title, subtitle, getStartedLabel,
    learnMoreLabel, badgeLabel }: HeroSectionProps,
) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <HeroBackground>
      <HeroDecorations />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Chip label={badgeLabel} sx={chipSx} />
        <Typography variant="h2" component="h1" fontWeight={800} sx={titleSx}>{title}</Typography>
        <Typography variant="h6" component="p" sx={subtitleSx}>{subtitle}</Typography>
        <HeroButtons
          getStartedLabel={getStartedLabel}
          learnMoreLabel={learnMoreLabel}
        />
        {isMd && <AnimatedCodeBlock />}
      </Container>
    </HeroBackground>
  );
}
