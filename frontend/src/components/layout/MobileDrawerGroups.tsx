'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { MORE_GROUPS } from '@/hooks/useHeader';
import MobileNavItem from './MobileNavItem';

interface Props {
  t: (key: string) => string;
}

export default function MobileDrawerGroups({ t }: Props) {
  return (
    <>
      {MORE_GROUPS.map((group) => (
        <Box key={group.labelKey}>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              px: 2,
              pt: 1,
              pb: 0.5,
              color: 'text.secondary',
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: '0.7rem',
              userSelect: 'none',
            }}
          >
            {t(group.labelKey)}
          </Typography>
          {group.items.map(({ labelKey, href }) => (
            <MobileNavItem key={labelKey} href={href} label={t(labelKey)} />
          ))}
        </Box>
      ))}
    </>
  );
}
