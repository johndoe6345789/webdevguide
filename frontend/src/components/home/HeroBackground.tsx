'use client';

import Box from '@mui/material/Box';

interface HeroBackgroundProps {
  children: React.ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #312e81 0%, #4f46e5 30%, #6366f1 50%, #7c3aed 75%, #6d28d9 100%)',
        color: 'white',
        py: { xs: 8, md: 14 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(99,102,241,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124,58,237,0.25) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {children}
    </Box>
  );
}
