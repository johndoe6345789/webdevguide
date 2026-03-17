'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@/i18n/navigation';

interface CtaButtonsProps { buttonLabel: string; secondaryLabel: string }

const primarySx = { bgcolor: 'white', color: '#4f46e5', fontWeight: 700, '&:hover': { bgcolor: 'grey.100', transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }, px: 4, py: 1.5, borderRadius: 2, transition: 'all 0.2s', fontSize: '1rem' } as const;
const secondarySx = { borderColor: 'rgba(255,255,255,0.4)', color: 'white', fontWeight: 600, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }, px: 4, py: 1.5, borderRadius: 2, transition: 'all 0.2s' } as const;

export default function CtaButtons(
  { buttonLabel, secondaryLabel }: CtaButtonsProps,
) {
  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
      <Button component={Link} href="/getting-started" variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={primarySx}>
        {buttonLabel}
      </Button>
      <Button component={Link} href="/examples" variant="outlined" size="large" sx={secondarySx}>
        {secondaryLabel}
      </Button>
    </Box>
  );
}
