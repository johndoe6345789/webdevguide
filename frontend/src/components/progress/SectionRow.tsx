'use client';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';

interface SectionRowProps {
  title: string;
  href: string;
  completed: boolean;
}

export default function SectionRow({ title, href, completed }: SectionRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, px: 2, borderBottom: 1, borderColor: 'divider', '&:hover': { bgcolor: 'action.hover' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {completed ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          <Box sx={{ width: 20, height: 20, borderRadius: '50%', border: 2, borderColor: 'divider' }} />
        )}
        <Typography component={Link} href={href} variant="body1" sx={{ textDecoration: 'none', color: 'text.primary', '&:hover': { color: 'primary.main' } }}>
          {title}
        </Typography>
      </Box>
      <Chip label={completed ? 'Complete' : 'Not started'} size="small" color={completed ? 'success' : 'default'} variant={completed ? 'filled' : 'outlined'} />
    </Box>
  );
}
