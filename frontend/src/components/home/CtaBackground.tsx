'use client';

import Box from '@mui/material/Box';

interface CtaBackgroundProps {
  children: React.ReactNode;
}

export default function CtaBackground({ children }: CtaBackgroundProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #312e81 0%, #4f46e5 40%, #7c3aed 70%, #6d28d9 100%)',
        color: 'white',
        py: { xs: 10, md: 14 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '140%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      {children}
    </Box>
  );
}
