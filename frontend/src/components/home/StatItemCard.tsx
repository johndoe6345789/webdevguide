'use client';

import Box from '@mui/material/Box';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

interface StatItemCardProps {
  icon: React.ComponentType<SvgIconProps>;
  value: string;
  label: string;
}

export default function StatItemCard(
  { icon: Icon, value, label }: StatItemCardProps,
) {
  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 3,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
          boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
        }}
      >
        <Icon sx={{ fontSize: 28, color: 'white' }} />
      </Box>
      <Typography variant="h3" component="p" fontWeight={800} color="text.primary" sx={{ mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        {label}
      </Typography>
    </Box>
  );
}
