'use client';

import Box from '@mui/material/Box';

export default function HeroDecorations() {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.2)',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '12%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.15)',
          animation: 'float 8s ease-in-out infinite 1s',
          display: { xs: 'none', md: 'block' },
        }}
      />
    </>
  );
}
