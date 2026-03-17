'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@/i18n/navigation';

interface HeroButtonsProps { getStartedLabel: string; learnMoreLabel: string }

const primarySx = { bgcolor: 'white', color: '#4f46e5', fontWeight: 700, '&:hover': { bgcolor: 'grey.100', transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }, px: 4, py: 1.5, borderRadius: 2, transition: 'all 0.2s', fontSize: '1rem' } as const;
const outlineSx = { borderColor: 'rgba(255,255,255,0.5)', color: 'white', fontWeight: 600, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-2px)' }, px: 4, py: 1.5, borderRadius: 2, transition: 'all 0.2s', fontSize: '1rem' } as const;

export default function HeroButtons(
  { getStartedLabel, learnMoreLabel }:
  HeroButtonsProps,
) {
  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: { xs: 6, md: 8 } }}>
      <Button component={Link} href="/getting-started" variant="contained" size="large" sx={primarySx}>
        {getStartedLabel}
      </Button>
      <Button component={Link} href="/fundamentals" variant="outlined" size="large" sx={outlineSx}>
        {learnMoreLabel}
      </Button>
    </Box>
  );
}
